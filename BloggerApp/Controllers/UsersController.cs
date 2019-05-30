using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BloggerApp.Core.AppUsers;
using BloggerApp.Core.Auth;
using BloggerApp.Core.Services;
using BloggerApp.Core.Services.AppUsers;
using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.AppUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloggerApp.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TestDBContext _context;
        private readonly UnitOfWork _unitOfWork;

        private IAppUserService _userService;
        private IJwtAuthentication _jwtAuthentication;

        public UsersController(TestDBContext context, IAppUserService userService, IJwtAuthentication jwtAuthentication, IUnitOfWork unitOfWork)
        {
            _context = context;
            _userService = userService;
            _jwtAuthentication = jwtAuthentication;
            _unitOfWork = unitOfWork as UnitOfWork;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForCreationDto request)
        {

            if(await _unitOfWork.userService.EmailExists(request.Email))
            {
                return BadRequest("Email has already been taken!");
            }
            var userEntity = Mapper.Map<AppUser>(request);

            var user = _unitOfWork.userService.Register(userEntity);
            Console.WriteLine("user: " + user);
            if(user != null)
            {
                await _unitOfWork.userService.AddAsync(user);
                await _unitOfWork.SaveChangesAsync();

                var accessToken = _jwtAuthentication.CreateAccessToken(user);
                return Ok(new { accessToken });
            }
            else
            {
                return BadRequest("Something went wrong");
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLogin)
        {
            var user = await _userService.Authenticate(userLogin.Email, userLogin.UserPassword);

            if(user == null)
            {
                return BadRequest("Username or Password is incorrect");
            }

            var requestAccessToken = _jwtAuthentication.CreateAccessToken(user);
            var requestRefreshToken = _jwtAuthentication.CreateRefreshToken(user.AppUserId);

            return Ok(new { accessToken = requestAccessToken });
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody]dynamic token)
        {
            string parsedAccessToken = Convert.ToString(token.AccessToken);

            var principal = _jwtAuthentication.GetPrincipalFromExpiredToken(parsedAccessToken);
            int userId = Convert.ToInt32(principal.Identity.Name);

            var refreshToken = await _jwtAuthentication.GetRefreshToken(userId);

            if(refreshToken != null)
            {
                _jwtAuthentication.DeleteRefreshToken(refreshToken);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody]dynamic token)
        {
            string parsedAccessToken = Convert.ToString(token.AccessToken);
            Console.WriteLine("tokennnn: " + parsedAccessToken);

            var principal = _jwtAuthentication.GetPrincipalFromExpiredToken(parsedAccessToken);
            int userId = Convert.ToInt32(principal.Identity.Name);

            string newAccessToken = await _jwtAuthentication.RefreshAccessToken(userId);

            if(newAccessToken == null)
            {
                return BadRequest("message from server: could not refresh token");
            }

            return Ok(new { accessToken = newAccessToken });
        }
    }
}
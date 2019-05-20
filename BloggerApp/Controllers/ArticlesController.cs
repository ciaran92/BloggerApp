using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloggerApp.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloggerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly TestDBContext _context;

        public ArticlesController(TestDBContext context)
        {
            _context = context;
        }


    }
}
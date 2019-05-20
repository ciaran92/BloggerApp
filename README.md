# BloggerApp
This is a blogger app created using Angular 7, .NET Core 2.2 & SQL Server. Users are able to view a list of different blog posts on a number of different categories. They also have the option to sign up and start liking posts as well as creating posts of their own.
.
.
#### Project Features
* Angular 7 Front End.
* .NET Core 2.2 RESTful API for the backend
* Use of JWT & Refresh tokens for Authenticating users
* Database First Approach
* Design Patterns (specifically unit of work & repository pattern)
* Unit Testing & Integration Testing

.
#### Project Architecture
The project is broken down into sub project class libraries which are then referenced together to separate out the different layers of functionality within the API.
* The main project **BloggerApp** will be your main entry point into the application. This is where the client will enter in accessing the controller endpoints. From here it will filter out to all your services with the use of dependency injection.
* **BloggerApp.Core** is where all your internal logic and service level functionality will be done.
* **BloggerApp.Data** will be where all the functionality involving the data connection layer of your API is done. It contains the connection to the database, Models, Entities etc.
* **BloggerApp.IntegrationTesting** is where the testing of all the HTTP endpoints for the application is carried out.

.
.
#### Project Setup:

##### .1  This project uses a database first approach. Create Database and run the following script to set up the tables that will be needed. Then scaffold the database to create all the models from the tables in the database.
.
```sql
use TestDB
go

drop table if exists AppUser
create table AppUser(
	AppUserId int primary key identity (1,1) not null,
	FirstName varchar(50), 
	LastName varchar(75),
	UserName varchar(100),
	UserPassword varchar(100),
	Email varchar(100),
	PasswordSalt varchar(50)
);
go

drop table if exists ArticleCategory
create table ArticleCategory
(
	CategoryId int primary key identity(1,1) not null,
	CategoryName varchar(100)
)
go

drop table if exists Article
create table Article
(
	ArticleId int primary key identity(1,1) not null,
	ArticleTitle varchar(100),
	ArticleBody varchar(max),
	AuthorId int not null,
	CategoryId int not null,
	foreign key (AuthorId) references AppUser(AppUserId),
	foreign key (CategoryId) references ArticleCategory(CategoryId)
)
go

drop table if exists RefreshToken
create table RefreshToken
(
	Id int primary key identity(1,1) not null,
	IssuedUtc datetime,
	ExpiresUtc datetime,
	Token varchar(450),
	AppUserId int,
	foreign key (AppUserId) references AppUser(AppUserId)
)

```

#### Integration Tests:
Integration Testing has been set up to test each of the API's endpoints. To Do this a new project needs to be created, here I have created the xUnit Project named **BloggerApp.IntegrationTesting** and installed the following NuGet Packages:

* Microsoft.AspNetCore.TestHost
* Newtonsoft.Json
* Microsoft.AspNetCore.Mvc
# BloggerApp

#### Project Setup

.1 **Create Database and run the following script to set up the tables that will be needed**

```sql
use TestDB
go

drop table if exists PasswordSalt
create table PasswordSalt
(
	SaltId int primary key not null identity (1,1),
	Salt varchar(50)
)
go

drop table if exists AppUser
create table AppUser(
	AppUserId int primary key identity (1,1) not null,
	FirstName varchar(50), 
	LastName varchar(75),
	UserName varchar(100),
	UserPassword varchar(100),
	Email varchar(100),
	PasswordSaltId int not null,
	foreign key (PasswordSaltId) references PasswordSalt(SaltId)
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
```
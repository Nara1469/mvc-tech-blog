# mvc-tech-blog

Bootcamp Week 14: Homework

# 14 Model-View-Controller (MVC): Tech Blog

## Table of Contents 

- [About Task](#about-task)
- [User Story](#user-story)
- [Getting Started](#getting-started)
- [Database Models](#database-models)
- [My Solution](#my-solution)
- [Live](#live)

## About Task

The purpose of the task is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. I built this site completely from scratch and deployed it to Heroku.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Database Models

The database name: `blog_db` contains the following four tables:

- User
- Post
- Comment

The database structure is shown in the following image:

![Database structure](./assets/blog-database.png)

### Associations

The Sequelize models execute the following relationships using association methods:

* `Post` belongs to `User`, and `User` has many `Post` models, as a user can have multiple posts but a post can only belong to one user.

* `Comment` belongs to `User`, and `User` has many `Comment` models, as a user can have multiple comments but a comment can only belong to one user.

* `Comment` belongs to `Post`, and `Post` has many `Comment` models, as a post can have multiple comments but a comment can only belong to one post.

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.

## My Solution

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

```                      
Tech Blog
|
blog_db database - Model               Controller         View  
|
├── /          root route              homeRoutes.js
│   ├── /homepage                                         homepage.handlebars
│   ├── /post/:id                                         post.handlebars  
│   ├── /login                                            login.handlebars
│   ├── /dashboard                                        dashboard.handlebars
│   ├── /create/:id                                       create.handlebars     
│   ├── /update/:id                                       update.handlebars
│   └── /comment/:id                                      comment.handlebars
├── /api/users                         userRoutes.js              
│   ├── POST  adding a new user           
│   ├── POST  checking existing user                      /api/users/login          
│   └── POST  ends user's login                           /api/users/logout 
├── /api/posts                         postRoutes.js                  
│   ├── GET   READ posts              
│   ├── GET   READ post By ID   
│   ├── POST  CREATE post               
│   ├── PUT   UPDATE post By ID               
│   └── DEL   DELETE post By ID
└──/api/comments                       commentRoutes.js
    ├── POST  CREATE comment
    ├── DEL   DELETE comment By ID  
    ├── GET   READ comment By ID                            
    └── GET   READ comments
```

## Live

This application is deployed to Heroku.com. Here is a link to the deployed website. [Heroku](https://the-tech-blog-mvc-structure.herokuapp.com/)

The following image shows the deployed HTML’s appearance: ![Homepage](./assets/tech-blog-homepage.png)

If you have any questions about the repo, open an issue or contact me directly at naraamtm@gmail.com. Here is a link to this application repo on [Github](https://github.com/Nara1469/mvc-tech-blog).

# Revashare

In this social network, everyone is friends with everyone. As a user, you will be able to register and login to your account. When you successfully login, you are automatically friends with everyone which means you will see a feed of everyone's posts. Users will be able to create a post and like other people's posts. Users will also have the ability to view other profiles which will display posts of that specific user.

## Technologies Used

* Spring MVC
* PostgreSQL
* Angular 2+
* GCP Compute Engine
* GCP Cloud SQL
* Spring ORM
* Java
* Hibernate

## Features

* Register/Login to an Account.
* Request to reset an account password.
* Update account information, and upload a user photo.
* Create a post with a description and uploaded images.
* Make a comment or add a like to a post.
* View a global feed of user posts.
* Visit a person's profile to see the posts and comments they have made.

## Getting Started

Follow these steps to set up the project.

1. Make sure you have git installed.
2. Clone this repository in a folder. It contains the Angular server and the Spring MVC server.
3. In the Angular project folder, there is a constants.ts file that holds the endpoints for the Spring controllers. Change these if necessary.
4. In the Spring project folder, there is a controllers package with two controllers. Change the CrossOrigin annotation to the port the angular project is running on.
5. Also in the Spring project folder, modify the dataSource bean in applicationContext to hold your database credentials.
6. Use "ng serve" to run the angular project.
7. To run the Spring MVC server, use Tomcat to run the project's War file.


## Usage

A user is prompted at the start to login or register an account. Once registered they can interact with other user posts as well as create their own.

![screen shot1](https://i.imgur.com/FbZDC3F.png)

![screen shot2](https://i.imgur.com/gPIjygG.png)

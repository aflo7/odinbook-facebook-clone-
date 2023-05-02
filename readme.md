Live website: https://app1.memberssonly.xyz

Technologies used: Node.js, MongoDB NoSQL Database, Javascript, HTML and CSS. 

I deployed the application using a DigitalOcean droplet.

### Features:
- ability to add friends, create posts
- add comments to posts
- see like count and comment count on each post
- pfp file upload, darkmode toggle
- username/password authentication, and facebook authentication
- ability to like posts
- responsive design on smaller device
- login session persists until the server turns off, or user logs out

### Node.js routes

GET     /auth/facebook              // attempt to login using Facebook
GET     /auth/facebook/callback     // redirects the user after a Facebook login attempt

POST    /comment/delete             // deletes a comment
POST    /comment/create             // creates a new comment

POST    /image                      // uploads a users profile image to the Node.js server

GET     /profile                    // get the users profile page
GET     /home                       // get the homepage
POST    /log-in                     // attempt to login using email/password
GET     /log-out                    // logs the user out
POST    /register                   // registers a new user
GET     /register                   // renders the register page
GET     /                           // renders the homepage

GET     /posts/:id                  // retrieve a post with a specific ID
POST    /posts/new                  // create a new post
POST    /posts/like                 // like a post
POST    /posts/delete               // used to delete a post

POST    /users/follow               // follow a certain user
POST    /toggle-dark-mode           // toggle dark mode on/off
GET     /find-friends               // get a list of the current user's friends


### Database Organization
- There are three main database models: User, Post, and Comment.

### Website screenshots

![alt](./website-screenshots/indexv2.png)

### Dark mode

![alt](./website-screenshots/homepagev2.png)

### Testing suite

![alt](./website-screenshots/testing.png)

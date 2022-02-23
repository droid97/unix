UNITY

Unity is an online, social media for gamers to cheer gaming realted stuff. Individuals can create accounts and use the platform to socialice and have fun while doing it. You can post images , look at posts and comment on them.

Link to live site: Unity

Database Schema
Features


IMAGES

At A Glance
UNITY is a full stack web application, that allows:

logged users can:
Post a photos awith a caption
Edit a those posts by the user
Delete a their posts post by their user
Post a comment
Edit those comments posted by the user
Delete a their posts
Application Architecture
Unity is built with a React/Redux frontend and an Python/Flask backend. PostgreSQL/SQLalchemy is also used as a database. Docker and Heroku are used for the live server.

Tech-Stack
Javascript React JS Redux Flask SQLalchemy PostgreSQl Docker Heroku

Key Features
User Authorization
When users log in, the password they provide is rehashed and checked against the original password. Sign up form:




Post/Edit/Delete a Post
An authorized user can post photos about anithing gaming related and can then be seen by any logged in user. Only the authorized user may then edit or delete the posted posts.



Post/Edit/Delete a Comment
An authorized regular user may post comments to a specific post posted by any user. Only the authorized user can then delete or edit the comment.

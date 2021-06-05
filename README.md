# Semester Project for SMC CS 81 Course

## Team member

- Ben Kweon

- Nancy 

## Used Stacks

- JavaScript

- Node JS

- Pug

- Tailwind CSS

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## [Live Example (click me)](https://test-semester-project.herokuapp.com/)

- Or hit the link => [https://test-semester-project.herokuapp.com/](https://test-semester-project.herokuapp.com/)

## Installation

```bash
git clone <GITREPOSITORY_URL>

npm install

npm run dev # For dev mode -> this will create tailwind style sheets too
```

## Project purpose

- We wanted to create interesting CV page that can attract people.

## Frontend description (Nancy)

- The frontend page is divided into three sections – Home, Schedule, and About. The ‘Home’ section contains our CVs as well as link to our individual CV pages. While the ‘schedule’ section contains the class schedule for the course, the ‘about’ section gives a brief introduction and reason the webpage was created.

- Another topic covered during the course was conditionals. Conditional statement defines a statement and executes only when a condition is met. Examples of conditional statements include ‘if…else’, ‘while’, ‘do…while’ and ‘switch’. For instance, the ‘home’ page greetings uses ‘if/else’ statement to change greetings when the webpage is first accessed. The code is attached as part of the project submission.

- We used one of the topics discussed/covered in class, which is creating tables with JavaScript. Consequently, the class schedule displayed on our pages used that knowledge to create a table of contents; this is was the assigned homework for week 7. Not only created some HTML elements with JavaScript codes, but we also manipulated its class names so that we can do some styling.
  
## Backend description(Ben)

- I decided to use `Pug` as a template engine for view part because it makes easy to display contents conditionally.
- I tried to use as many middlewares as possible because I did not think I am good at handling it.
- The live-server is running over `Heroku`. I hosted the project to learn more about deployment.
- My favourite part of CS81 course was using `Node JS` and `Express.js`. So I decided to focus more on the backend part.

### Package.json commands

- `start`: Runs production mode server.
- `build`: Builds `/build` folder for production.
- `dev`: Complie CSS and run developement mode server

### Routing

#### 1. Description

- Used Node JS & Express JS to manage the frontend part routing.
- Used static route to serve images, CSS and JavaScript files.
- Used queries and params to get information from client sides.
- Used middlewares to handle if the client gave us the username or not.

#### 2. Routes

- `/`: Serve `home.pug`. Also sends the data in `DB` so that it can display our CV card.
- `/about`: Serve `about.pug`.
- `/table`: Serve `table.pug`. 
- `/static`: Serve all static files.
- `/error`: Serve 403 and 404 error page depends on the status codes.
- `/api/v1`: Currently not doing anything.

### Tailwind CSS

- For better user interface and user experience, decided to use `Tailwind CSS`.
- Compiling Tailwind CSS was not an easy job for sure. I had to learn how to use `postcss` and had to write some commands in `package.json` to run it either dev mode or prod mode.

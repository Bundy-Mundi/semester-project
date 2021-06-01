# Semester Project for SMC CS 81 Course

## Team member

- Ben Kweon

- Nancy 

## Installation

```bash
git clone <URL>

npm install

npm run dev # For dev mode -> this will create tailwind style sheets too
```

- [Live Example](https://test-semester-project.herokuapp.com/)

README text file containing an explanation of what your project is, the technologies you chose, why you chose said technologies, and how your experience was working on this project. You may also explain the topic of the course you found most interesting and how you applied it to your project in the README.

## Project purpose

- A website that displays our profiles.
## Frontend description

### Start page

- We used GET request to get username from the user. 

### Home page

- We used conditional expressions to display one of 'morning', 'afternoon' and 'evening'
- We used `Date.prototype.getYear()` to update footer's copyright year automatically.
### About page

### Schedule page

## Backend description

### Package.json commands

- `start`: Runs production mode server.
- `build`: Builds `/build` folder for production.
- `dev`: Complie CSS and run developement mode server
### Routing

- Used Node JS & Express JS to manage the frontend part routing.
- Used queries and params to get information from client sides.
- Used middlewares to handle if the client gave us the username or not.

### Tailwind CSS

- For better user interface and user experience, decided to use `Tailwind CSS`

## Used Stacks

- Node JS

- Pug

- Tailwind CSS

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
## Part

- Ben Kweon: Backend, Tailwind CSS
  
- Nancy Anatuanya: Frontend JS
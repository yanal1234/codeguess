# CodeGuess (Assembly: Endgame)

A programming word-guessing game built with React.
Guess the hidden word before you run out of attempts and save the programming world from Assembly.

## Features

* Word guessing gameplay (Wordle-style)
* Programming themed words
* On-screen keyboard with colors
* Win / Lose modal with animations
* Sounds for win and game over
* Score system (wins, losses, streak)
* Responsive design

## Tech Stack

* React + Vite
* JavaScript
* CSS
* GitHub Pages (deployment)

## Run Locally

Clone the project:
git clone [https://github.com/yanal1234/codeguess.git](https://github.com/yanal1234/codeguess.git)

Go to folder:
cd codeguess

Install dependencies:
npm install

Run project:
npm run dev

Open in browser:
[http://localhost:5173](http://localhost:5173)

## Build Project

npm run build

## Deploy to GitHub Pages

Make sure vite.config.js contains:
base: "/codeguess/"

Then run:
npm run deploy

After deployment open:
[https://yanal1234.github.io/codeguess/](https://yanal1234.github.io/codeguess/)

## Project Structure

src/
assets/        sounds & images
languages.js   languages data
listofword.js  words list
utils.js       helper functions
App.jsx

## Author

GitHub: [https://github.com/yanal1234](https://github.com/yanal1234)

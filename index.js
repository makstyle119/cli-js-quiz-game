#!/usr/bin/env node

//   __  __    _    _  ______ _______   ___     _____ _ _  ___
//  |  \/  |  / \  | |/ / ___|_   _\ \ / / |   | ____/ / |/ _ \
//  | |\/| | / _ \ | ' /\___ \ | |  \ V /| |   |  _| | | | (_) |
//  | |  | |/ ___ \| . \ ___) || |   | | | |___| |___| | |\__, |
//  |_|  |_/_/   \_\_|\_\____/ |_|   |_| |_____|_____|_|_|  /_/

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Test There JavaScript Concept? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's a correct answer`,
    });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(
    `Congrats , ${playerName} !\n You Js Concept \n are pretty strong`,
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `Programming isn't about what you know; it's about making the command line look cool`
        )
      );
      process.exit(0);
    }
  );
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Inside which HTML element do we put the JavaScript? \n',
    choices: ['<javascript>', '<scripting>', '<js>', '<script>'],
  });

  return handleAnswer(answers.question_1 === '<script>');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message:
      'What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id="demo">This is a demonstration.</p>\n',
    choices: [
      'document.getElement("p").innerHTML = "Hello World!";',
      'document.getElementById("demo").innerHTML = "Hello World!";',
      'document.getElementByName("p").innerHTML = "Hello World!";',
      '#demo.innerHTML = "Hello World!";',
    ],
  });
  return handleAnswer(
    answers.question_2 ===
      'document.getElementById("demo").innerHTML = "Hello World!";'
  );
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `Where is the correct place to insert a JavaScript? \n`,
    choices: [
      'The <head> section',
      'The <body> section',
      'Both the <head> section and the <body> section are correct',
    ],
  });

  return handleAnswer(answers.question_3 === 'The <body> section');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message:
      'What is the correct syntax for referring to an external script called "xxx.js"? \n',
    choices: [
      '<script src="xxx.js">',
      '<script href="xxx.js">',
      '<script name="xxx.js">',
    ],
  });
  return handleAnswer(answers.question_4 === '<script src="xxx.js">');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message: 'The external JavaScript file must contain the <script> tag.\n',
    choices: ['True', 'False'],
  });

  return handleAnswer(answers.question_5 === 'False');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();

const inquirer = require('inquirer');
const fs = require('fs')

const licenseInfo = {
    "MIT": {
        "badge": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    }
}

const questions = [
    {
        type: "input",
        name: "title",
        message: "Provide the title of your project",
    },
    {
        type: "input",
        name: "description",
        message: `Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:\n- What was your motivation?\n- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")\n- What problem does it solve?\n- What did you learn?\n`
    },
    {
        type: "input",
        name: "installation",
        message: "Provide a step-by-step description of how to get the development environment running for an installation section"
    },
    {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for a usage section"
    },
    {
        type: "input",
        name: "collaborators",
        message: "List your collaborators, if any, with links to their GitHub profiles.\n\nIf you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.\n\nIf you followed tutorials, include links to those here as well.\n\n"
    },
    {
        type: "input",
        name: "tests",
        message: "Go the extra mile and write tests for your application. Then provide examples on how to run them here for a tests section"
    },
    {
        type: "input",
        name: "tests",
        message: "Go the extra mile and write tests for your application. Then provide examples on how to run them here for a tests section"
    },
    {
        type: "input",
        name: "github",
        message: "Provide your github username"
    },
    {
        type: "input",
        name: "email",
        message: "Provide your email"
    },
    {
        type: "list",
        name: "license",
        message: "Select which license would you like to use",
        choices: Object.keys(licenseInfo)
    }
];

function generateReadMe(content) {
    console.clear()

    try {
        if (!fs.existsSync('./output/')) {
            fs.mkdirSync('./output/');
        }

        fs.writeFileSync('./output/README.md', content, 'utf-8');

        console.log("Generated output in 'output' folder as 'README.md'")
    } catch (err) {
        console.error(err);
        console.log("Failed to create file.")
    }
}

function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            let readMeFile = []

            // Add badge
            readMeFile.push(`${licenseInfo[answers.license].badge}\n`)

            // Add title
            readMeFile.push(`# ${answers.title}\n`)

            // Add description
            readMeFile.push(`## Description\n${answers.description}\n`)

            // Add table of contents
            readMeFile.push(`## Table of Contents\n\n${[
                "- [Installation](#installation)",
                "- [Usage](#usage)",
                "- [Credits](#credits)",
                "- [Tests](#tests)",
                "- [Questions](#questions)",
            ].join("\n\n")}\n`)

            // Add installation
            readMeFile.push(`## Installation\n${answers.installation}\n`)

            // Add usage
            readMeFile.push(`## Usage\n${answers.usage}\n`)

            // Add collaborators
            readMeFile.push(`## Credits\n${answers.collaborators}\n`)

            // Add tests
            readMeFile.push(`## Tests\n${answers.tests}\n`)

            // Add license
            readMeFile.push(`## License\n${answers.license} License\n\nCopyright (c) 2023 ${answers.github}\n\nermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n`)

            // Add questions
            readMeFile.push(`## Questions? Contact me:\n**Github:** [${answers.github}](https://github.com/${answers.github})\n\n**Email me:** ${answers.email}`)

            generateReadMe(readMeFile.join(""))
        })
        .catch((error) => {
            console.error(error)
        });
}

// Function call to initialize app
init();

/**
 * 0 - Title
 * 1 - Description
 * 2 - Installtion
 * 3 - Usage
 * 4 - Contribution
 * 5 - Tests
 */

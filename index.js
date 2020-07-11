const inquirer          = require("inquirer");
const fs                = require("fs");
const generateMarkdown  = require("./utils/generateMarkdown");
const api               = require("./utils/api");

// Licenses 
const gnu    = "Licensed under the [GNU GPLv3 License](https://spdx.org/licenses/GPL-3.0-or-later.html).";
const mit    = "Licensed under the [MIT License](https://spdx.org/licenses/MIT.html).";
const isc    = "Licensed under the [ISC License](https://spdx.org/licenses/ISC.html).";

// Contributors
const yesContributors = "If you would like to contribute to this project, please follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) guidelines."
const noContributors  = "This project is not accepting any contributions at this time."


// GitHub Username
const gitHubQuestion = [
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    }
];

// Questions
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the name of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "What is the description of your project."
    },
    {
        type: "input",
        name: "installation",
        message: "What is needed for installation?"
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use your application?"
    },
    {
        type: "input",
        name: "tests",
        message: "How would you run tests on this project?"
    },
    {
        type: "list",
        name: "license",
        message: "What type of license would you like?",
        choices: [
            "GNU GPLv3",
            "MIT",
            "ISC",
            "None"
        ]
    },
    {
        type: "list",
        name: "contributors",
        message: "Would you like other developers to contribute to your project?",
        choices: [
            "Yes",
            "No"
        ]
    }
];


// 
async function combinedData() {
    try {
        // Github
        await inquirer.prompt(gitHubQuestion).then(function(response){
            return username = response.username;
        });
        
        await api.getUser(username);

        await inquirer.prompt(questions).then(function(response){
            return responses = response;
        });

        responses.username = username;
        responses.image = gitHubImg;
        responses.email = gitHubEmail;

        // Licenses
        if(responses.license === "Apache License 2.0"){
            responses.license = apache;
        } else if(responses.license === "GNU GPLv3"){
            responses.license = gnu;
        } else if(responses.license === "MIT"){
            responses.license = mit;
        } else if(responses.license === "ISC"){
            responses.license = isc;
        } else {
            responses.license = "This project is currently not licensed."
        }

        // Contributors
        if(responses.contributors === "Yes"){
            responses.contributors = yesContributors;
        } else {
            responses.contributors = noContributors;
        }

        // WriteFile
        writeToFile("readmeGenerated.md", generateMarkdown(responses));

    } catch (err){
        console.log(err);
    }
}


combinedData();

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err){
            console.log(err);
        }
            console.log("Data entered!");
    });
}
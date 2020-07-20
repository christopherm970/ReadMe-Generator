const inquirer          = require("inquirer");
const fs                = require("fs");
const generateMarkdown  = require("./utils/generateMarkdown");
const api               = require("./utils/api");

// Licenses 
const gnu    = "Licensed under the [GNU GPLv3 License](https://spdx.org/licenses/GPL-3.0-or-later.html).";
const mit    = "Licensed under the [MIT License](https://spdx.org/licenses/MIT.html).";
const isc    = "Licensed under the [ISC License](https://spdx.org/licenses/ISC.html).";

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
        message: "What is the description?"
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
        message: "How would you run test?"
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
        name: "contributorQ",
        message: "Would you like other developers to contribute to your project?",
        choices: [
            "Yes",
            "No",
        ],
       
    },
    // Add contributors name question.
    {
        type: "input",
        name: "contribNames",
        message: "What are the contributors names?", 
        when: response => {
            return (response.contributorQ === "Yes")
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the contact email to be used?"
    }
];


// 
async function allData() {
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
        responses.image = gitHubImage;

        // Licenses
        if(responses.license === "GNU GPLv3"){
            responses.licenseDescrip = gnu;
        } else if(responses.license === "MIT"){
            responses.licenseDescrip = mit;
        } else if(responses.license === "ISC"){
            responses.licenseDescrip = isc;
        } else {
            responses.licenseDescrip = "This project is currently not licensed."
        }

        // Contributors
       

        // WriteFile
        writeToFile("readmeGenerated.md", generateMarkdown(responses));

    } catch (err){
        console.log(err);
    }
}


allData();

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err){
            console.log(err);
        }
            console.log("Data entered!");
    });
}
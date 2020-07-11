function generateMarkdown(data) {
  return `
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)
  
  # **${data.title}**
  # Table of Contents
  * [Project Description](#project-description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Tests](#tests)
  * [License](#license)
  * [Contributions](#contributions)
  * [Questions](#questions)
  # Project Description
  ${data.description}
  
  # Installation
  ${data.installation}
  # Usage
  ${data.usage}
  # Tests
  ${data.tests}
  # License
  ${data.license}
  # Contributions
  ${data.contributors}
  # Questions
  If you have any questions, please contact the project owner by clicking on the email listed below.  
  
  ![user image](${data.image})
  #### ${data.email !== null ? "[" + data.email + "](mailto:" + data.email + ")" : "This user's email is private."}
`;
}

module.exports = generateMarkdown;
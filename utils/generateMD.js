function generateMarkdown(data) {
  return `
  
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
  ${generateBadge(data.license)}
  ${data.licenseDescrip}
  # Contributions
  ${data.contribNames}
  # Questions
  If you any questions, please contact the project owner here: [${data.email}](mailto:${data.email})
  
  ![user image](${data.image})
`;
}
function generateBadge(license){
  if(license === "None"){
    return ""
  }else{
    if(license === "GNU GPLv3"){
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    } else if (license === "MIT"){
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    } else if (license === "ISC") {
      return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
    }
  }
}
module.exports = generateMarkdown;
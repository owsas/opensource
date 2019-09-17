/**
 * Generates a list of the packages and places it in the Readme file
 */
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as fire from 'js-fire';

const packages = {
  update() {
    const START_COMMENT = '<!-- start packages -->';
    const END_COMMENT = '<!-- end packages -->';
    const cwd = path.join(__dirname, '..', 'packages');
    const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), { encoding: 'utf8' });
    const packageFiles = glob.sync("**/package.json", { 
      cwd,
    });

    let packageNames = [];
    let packagesString = '';
    packageFiles.forEach((packageFile) => {
      const info = require(path.resolve(cwd, packageFile));
      packageNames.push(info.name);
      packagesString += `
## ${info.name}@${info.version}  
${info.description}
`;
    });

    // Replace the contents of the previous readme
    const newReadme = readme.replace(new RegExp(`
${START_COMMENT}
*
${END_COMMENT}`, 'ig'), `
${START_COMMENT}
${packagesString}
${END_COMMENT}
    `);
    
    fs.writeFileSync(path.join(__dirname, '..', 'README.md'), newReadme, { encoding: 'utf8' });

    return `Generated readme for packages: ${packageNames.join(', ')}`;
  }
}

fire(packages);

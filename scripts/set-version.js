/**
 * Writes REACT_APP_VERSION from package.json into .env
 * so React can access it at build time via process.env.REACT_APP_VERSION
 */
const fs = require('fs');
const path = require('path');

const pkg = require(path.join(__dirname, '..', 'package.json'));
const envPath = path.join(__dirname, '..', '.env');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  // Remove existing REACT_APP_VERSION line
  envContent = envContent.replace(/^REACT_APP_VERSION=.*\n?/m, '');
}

envContent = envContent.trimEnd() + '\nREACT_APP_VERSION=' + pkg.version + '\n';
fs.writeFileSync(envPath, envContent);

console.log(`Set REACT_APP_VERSION=${pkg.version}`);

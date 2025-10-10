const fs = require('fs');
const path = require('path');

const version = process.argv[2];
const packageJsonPath = path.join(__dirname, '..', 'package.json');

if (!version) {
  console.error('Version argument is required');
  process.exit(1);
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Updated package.json version to ${version}`);
} catch (error) {
  console.error('Error updating package.json:', error);
  process.exit(1);
}
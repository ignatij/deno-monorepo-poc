import fs from 'node:fs';
import process from 'node:process';

const version = process.argv[2];
const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
json.version = version;
fs.writeFileSync('package.json', JSON.stringify(json, null, 2));
console.log(`✅ Updated package.json to ${version}`);
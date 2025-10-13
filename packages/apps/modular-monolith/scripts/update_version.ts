const file = "deno.json";
const version = Deno.args[0];
const json = JSON.parse(await Deno.readTextFile(file));
json.version = version;
await Deno.writeTextFile(file, JSON.stringify(json, null, 2));
console.log(`✅ Updated deno.json to ${version}`);

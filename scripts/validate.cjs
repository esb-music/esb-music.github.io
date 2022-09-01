/*
 * validate.cjs is validating a json file with the respect to a json schema file.
 * usage: node validate.cjs json-file schema-file
 *
 * validate.cjs is based on the Ajv JSON schema validator,
 * see https://ajv.js.org.
 */

// imports
const fs = require('fs');
const Ajv2019 = require('ajv/dist/2019');
const ajv = new Ajv2019();
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords')
addFormats(ajv);
addKeywords(ajv, "uniqueItemProperties");

// this is (in the tradition of TeX)
console.log("This is validate.cjs Rev. 1.0");
console.log("validate.cjs checks whether a json file conforms to the given schema");
console.log("");

// command-line: expect 2 parameters
const args = process.argv.slice(2);
if (args.length !== 2) usage();

// variables
let dataPath = args[0];
let dataFile;
let data;

let schemaPath = args[1];
let schemaFile;
let schema;

// opening and reading files
try {
	dataFile = fs.readFileSync(dataPath);
} catch (e) {
	console.log("error: could not open " + dataPath);
	process.exit(1);
}
try {
	data = JSON.parse(dataFile);
} catch (e) {
	console.log("error: " + dataPath + " not a json file");
	process.exit(1);
}

try {
schemaFile = fs.readFileSync(schemaPath);	
} catch (e) {
	console.log("error: could not open " + schemaPath);
	process.exit(1);
}	
try {
schema = JSON.parse(schemaFile);
} catch (e) {
	console.log("error: " + schemaPath + " not a json file");
	process.exit(1);
}	

// validate
const valid = ajv.validate(schema, data);
if (!valid) {
	console.log(ajv.errors)
} else {
	console.log(dataPath + " conforms to " + schemaPath);
}	

// usage
function usage() {
	console.log("usage:");
	console.log("node validate.cjs json-file schema-file");
}	

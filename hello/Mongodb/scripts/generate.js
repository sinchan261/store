const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Import using the correct path
const { generateProject } = require("./generate-project-structure.js");

async function main() {
  try {
    console.log("Creating project structure...");

    // Create scripts directory if it doesn't exist
    fs.mkdirSync("scripts", { recursive: true });

    // Generate the project structure
    generateProject();

    // Change directory to the project folder
    process.chdir("ecommerce-api");

    // Install dependencies
    console.log("Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });

    console.log("\nProject structure created successfully!");
    console.log(
      'cd into "ecommerce-api" directory and run "npm start" to start the server'
    );
  } catch (error) {
    console.error("Error creating project:", error);
    process.exit(1);
  }
}

main();

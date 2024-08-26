#!/usr/bin/env node
import inquirer from "inquirer";
import { program } from "commander";

import { boostrapCollectionApi } from "./boostrap/boostrapCollectionApi.js";


program
  .name("miaw-gen")
  .version("1.0.0")
  .description("A code generator for MeteorJS")
  .action(async () => {
    const options = await inquirer.prompt([
      {
        type: "select",
        name: "type",
        message: "What do you want to create?",
        choices: ["collectionApi", "uiList", "uiCreate"],
      },
    ]);

    if (options.type === "collectionApi") {
      const answers = await inquirer
        .prompt([
          {
            type: "input",
            name: "collectionName",
            message: "What's the collection name?",
          },
          {
            type: "input",
            name: "varName",
            message: "What's the name for the variable?",
          },
        ]);

      await boostrapCollectionApi(answers);
    }
  });

program.parse(process.argv);
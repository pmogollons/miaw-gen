import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import camelCase from "lodash.camelcase";
import { replaceInFile } from "replace-in-file";


/**
 * A function to bootstrap a project from template.
 * @param {Object} config - The config object.
 * @param {string} config.appName - The name of the application.
 */
export const boostrapCollectionApi = async (config) => {
  const params = {
    collectionName: config.collectionName,
    collectionNameLC: camelCase(config.collectionName),
    varName: camelCase(config.varName),
    schemaName: `${camelCase(config.collectionName)}Schema`,
    listQueryName: `${camelCase(config.collectionName)}ListQuery`,
    detailsQueryName: `${camelCase(config.collectionName)}DetailsQuery`,
  };

  const templatePath = path.join(import.meta.url.replace("file://", ""), "../../..", "templates", "api");
  const newPath = process.cwd().endsWith("/imports/api") ? process.cwd() : path.join(process.cwd(), "imports", "api");
  const apiDirExists = await fs.exists(newPath);

  if (!apiDirExists) {
    console.log(chalk.red(`The api directory doesn't exist at ${newPath}`));
    return;
  }

  const destinationPath = path.join(newPath, params.collectionNameLC);

  console.log(chalk.blue(`Creating ${config.collectionName}... at ${destinationPath}`));

  const newDirExists = await fs.exists(destinationPath);

  if (newDirExists) {
    console.log(chalk.red(`The ${params.collectionNameLC} directory already exist`));
    return;
  }

  try {
    await fs.copy(templatePath, destinationPath);

    const replaceOptions = {
      files: path.join(destinationPath, "**", "*"),
      from: [
        /COLLECTION_NAME_LC/g,
        /COLLECTION_NAME/g,
        /VAR_NAME/g,
        /SCHEMA_NAME/g,
        /LIST_QUERY_NAME/g,
        /DETAILS_QUERY_NAME/g,
      ],
      to: [
        params.collectionNameLC,
        params.collectionName,
        params.varName,
        params.schemaName,
        params.listQueryName,
        params.detailsQueryName,
      ],
    };

    await replaceInFile(replaceOptions);

    fs.move(path.join(destinationPath, "queries", "templateListQuery.ts"), path.join(destinationPath, "queries", `${params.listQueryName}.ts`));
    fs.move(path.join(destinationPath, "queries", "templateDetailsQuery.ts"), path.join(destinationPath, "queries", `${params.detailsQueryName}.ts`));

    await fs.appendFile(path.join(newPath, "..", "startup/server/registerApi.js"), `

import "/imports/api/${params.collectionNameLC}/links";
import "/imports/api/${params.collectionNameLC}/schema";
import "/imports/api/${params.collectionNameLC}/methods";
import "/imports/api/${params.collectionNameLC}/reducers";
import "/imports/api/${params.collectionNameLC}/server/hooks";
import "/imports/api/${params.collectionNameLC}/server/indexes";
import "/imports/api/${params.collectionNameLC}/server/queries.expose";`);
  } catch (error) {
    // TODO: Do cleanup
    console.error(chalk.red("Error occurred during file replacement:"), error);
  }

  console.log(chalk.green(`${config.collectionName} api created at ${destinationPath}`));
};
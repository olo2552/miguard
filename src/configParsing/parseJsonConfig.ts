import {IConfigFileInterface} from "./configFile.interface";

const parseJsonConfig = (jsonConfig: string): IConfigFileInterface => {
    const {migrationsFolderPath, database, orm}: IConfigFileInterface = JSON.parse(jsonConfig);

    if (!migrationsFolderPath) {
        throw Error("Migration Folder not specified!");
    }

    if (!orm) {
        throw Error("ORM name not specified!");
    }

    if (!database.engine) {
        throw Error("Database Engine not specified!");
    }

    if (!database.host) {
        throw Error("Database Host not specified!");
    }

    if (!database.port) {
        throw Error("Database Port not specified!");
    }

    if (!database.dbName) {
        throw Error("Database Name not specified!");
    }

    if (!database.user) {
        throw Error("Database User not specified!");
    }

    return {
        migrationsFolderPath,
        database,
        orm
    }
};

export {parseJsonConfig}

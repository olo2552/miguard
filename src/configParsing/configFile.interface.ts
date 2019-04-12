import {IDatabase} from "../interfaces/database.interfaces";
import {Orms} from "../ormAdapters/ormAdapter.interfaces";

export interface IConfigFileInterface {
    migrationsFolderPath: string,
    database: IDatabase,
    orm: Orms,
}

import * as _ from "lodash"
import {promises as fsPromises} from "fs"
import {INormalizedMigration} from "../interfaces/normalizedMigration";
import {IOrmAdapter} from "./ormAdapter.interfaces";


const getMigrationFiles = (migrationFolderPath: string): Promise<INormalizedMigration[]> => {
    return fsPromises.readdir(migrationFolderPath)
        .then((migrationFiles) => {
            return _.map(migrationFiles, (migrationFile) => {
                const fileNameChunks = _.split(migrationFile, ".");
                const chunksWithoutExtension = _.dropRight(fileNameChunks);
                const fileName = _.join(chunksWithoutExtension, ".");
                const [timestampPart, namePart] = _.split(fileName, "-");

                return {
                    timestamp: _.toSafeInteger(timestampPart),
                    name: namePart,
                }
            });
        })
        .then((normalizedMigrations) => {
            console.log("Migrations files: ", normalizedMigrations);
            return normalizedMigrations
        });

};

const typeOrmAdapter: IOrmAdapter = {
    getMigrationFiles
};

export default typeOrmAdapter

import * as _ from "lodash"
import {Client} from "pg"
import {INormalizedMigration} from "../interfaces/normalizedMigration";
import {IDbAdapter, IPostgresConfig} from "./dbAdapter.interfaces";


const getCurrentMigrations = (clientConfig: IPostgresConfig): Promise<INormalizedMigration[]> => {
    const postgresClient = new Client(clientConfig);

    return postgresClient.connect()
        .then(() => {
            return postgresClient.query(`SELECT timestamp, name FROM migrations`)
        })
        .then((dbResponse): Array<{name: string, timestamp: string}> => {
            return dbResponse.rows
        })
        .then((migrations): INormalizedMigration[] => {
            return _.map(migrations, (migration): INormalizedMigration => {
                const oldNameChars = _.split(migration.name, "");
                const charsWithoutTimestamp = _.dropRightWhile(oldNameChars, (char) => {
                    return !_.isNaN(parseInt(char, 10))
                });
                const nameWithoutTimestamp = _.join(charsWithoutTimestamp, "");

                return {
                    timestamp: _.toSafeInteger(migration.timestamp),
                    name: nameWithoutTimestamp
                }
            })
        })
};

const postgresAdapter: IDbAdapter = {
    getCurrentMigrations
};

export default postgresAdapter

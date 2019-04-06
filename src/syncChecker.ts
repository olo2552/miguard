import * as _ from "lodash"

import {IDbAdapter, IPostgresConfig} from "./DbAdapters/dbAdapter.interfaces";
import {IOrmAdapter} from "./OrmAdapters/ormAdapter.interfaces";
import {INormalizedMigration} from "./interfaces/normalizedMigration";

const enum InSyncMessage {
    IN_SYNC_MESSAGE = "Database is fully synced in",
    DIVERGED_MESSAGE = "Your database is NOT fully synced with migration files. Diverged entities:",
}

interface IMigrationsDifference {
    notInFiles: INormalizedMigration[];
    notInDb: INormalizedMigration[];
}

interface IIsInSyncResponse {
    inSync: boolean;
    message: InSyncMessage;
    divergedEntities?: IMigrationsDifference
}

const isInSync = (dbAdapter: IDbAdapter, ormAdapter: IOrmAdapter) =>
    async (migrationFilesPath: string, clientConfig: IPostgresConfig): Promise<IIsInSyncResponse> => {
        const ormFilesMigrations = await ormAdapter.getMigrationFiles(migrationFilesPath);
        const dbRowsMigrations = await dbAdapter.getCurrentMigrations(clientConfig);

        const notInFiles = _.differenceWith(ormFilesMigrations, dbRowsMigrations, _.isEqual);
        const notInDb = _.differenceWith(dbRowsMigrations, ormFilesMigrations, _.isEqual);

        if (!notInDb || !notInFiles) {
            return {
                inSync: true,
                message: InSyncMessage.IN_SYNC_MESSAGE,
            };
        }

        return {
            inSync: false,
            message: InSyncMessage.DIVERGED_MESSAGE,
            divergedEntities: {
                notInFiles,
                notInDb,
            }
        };
    };

export {isInSync}
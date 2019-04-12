import * as _ from "lodash"

import {IDbAdapter, IPostgresConfig} from "../dbAdapters/dbAdapter.interfaces";
import {IOrmAdapter} from "../ormAdapters/ormAdapter.interfaces";
import {INormalizedMigration} from "../interfaces/normalizedMigration";

const enum InSyncMessage {
    IN_SYNC_MESSAGE = "Database is fully synced in",
    DIVERGED_MESSAGE = "Your database is NOT fully synced with migration files. Diverged entities:",
}

interface IMigrationsDifference {
    notInFiles: INormalizedMigration[];
    notInDb: INormalizedMigration[];
}

export interface IIsInSyncResponse {
    inSync: boolean;
    message: InSyncMessage;
    divergedEntities?: IMigrationsDifference
}

const isInSync = (dbAdapter: IDbAdapter, ormAdapter: IOrmAdapter) =>
    async (migrationFilesPath: string, clientConfig: IPostgresConfig): Promise<IIsInSyncResponse> => {
        const dbRowsMigrations = await dbAdapter.getCurrentMigrations(clientConfig);

        if (!dbRowsMigrations) {
            return
        }

        const ormFilesMigrations = await ormAdapter.getMigrationFiles(migrationFilesPath);

        const notInDb = _.differenceWith(ormFilesMigrations, dbRowsMigrations, _.isEqual);
        const notInFiles = _.differenceWith(dbRowsMigrations, ormFilesMigrations, _.isEqual);

        if (_.isEmpty(notInDb) && _.isEmpty(notInFiles)) {
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
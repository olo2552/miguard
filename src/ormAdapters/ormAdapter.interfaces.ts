import {INormalizedMigration} from "../interfaces/normalizedMigration";

export interface IOrmAdapter {
    getMigrationFiles: (migrationFolderPath: string) => Promise<INormalizedMigration[]>
}
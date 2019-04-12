import {INormalizedMigration} from "../interfaces/normalizedMigration";
import {DatabaseEngines, IDatabase} from "../interfaces/database.interfaces";

export interface IPostgresConfig extends IDatabase {
    engine: DatabaseEngines.POSTGRES;
}

export interface IDbAdapter {
    getCurrentMigrations: (clientConfig: IPostgresConfig) => Promise<INormalizedMigration[]>;
}

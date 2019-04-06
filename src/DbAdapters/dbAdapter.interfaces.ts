import {INormalizedMigration} from "../interfaces/normalizedMigration";

export interface IDbAdapter {
    getCurrentMigrations: (clientConfig: IPostgresConfig) => Promise<INormalizedMigration[]>;
}

export interface IPostgresConfig {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
}
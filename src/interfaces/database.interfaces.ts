export enum DatabaseEngines {
    POSTGRES = "PostgreSQL"
}

export interface IDatabase {
    engine: DatabaseEngines,
    dbName: string
    host: string,
    port: number,
    user: string,
    password?: string,
}

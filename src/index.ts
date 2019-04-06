import {IPostgresConfig} from "./DbAdapters/dbAdapter.interfaces";
import {isInSync} from "./syncChecker";
import postgresAdapter from "./DbAdapters/Postgres.adapter";
import typeOrmAdapter from "./OrmAdapters/TypeORM";

const CLIENT_CONFIG: IPostgresConfig = {
    database: "montr_app",
    host: "0.0.0.0",
    port: 5433,
    user: "web",
    password: "web",
};

const DB_MIGRATIONS_FOLDER = "/Users/mundane/repos/montr-app/backend/src/database/migration";


isInSync(postgresAdapter, typeOrmAdapter)(DB_MIGRATIONS_FOLDER, CLIENT_CONFIG)
    .then((inSync) => {
        console.log(inSync);

        return inSync
    });
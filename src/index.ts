import {inspect} from "util";
import {IPostgresConfig} from "./DbAdapters/dbAdapter.interfaces";
import {isInSync} from "./syncChecker";
import postgresAdapter from "./DbAdapters/Postgres.adapter";
import typeOrmAdapter from "./OrmAdapters/TypeORM";
import {watchFilesChanges} from "./fileWatcher";

const CLIENT_CONFIG: IPostgresConfig = {
    database: "montr_app",
    host: "0.0.0.0",
    port: 5433,
    user: "web",
    password: "web",
};

const DB_MIGRATIONS_FOLDER = "/Users/mundane/repos/montr-app/backend/src/database/migration";

watchFilesChanges(DB_MIGRATIONS_FOLDER)
    .on('all', (event, path) => {
        console.log({event, path});

        isInSync(postgresAdapter, typeOrmAdapter)(DB_MIGRATIONS_FOLDER, CLIENT_CONFIG)
            .then((inSync) => {
                console.log(inspect(inSync, false, null, true));

                return inSync
            });
    });


import {inspect} from "util";
import * as _ from "lodash"

import {IIsInSyncResponse, isInSync} from "./syncChecker/syncChecker";
import {watchFilesChanges} from "./fileWatcher/fileWatcher";
import {getConfig} from "./configParsing/getConfig";
import {dbEngineToAdapter} from "./dbAdapters/dbEngineToAdapter.dictionary";
import {ormNameToOrm} from "./ormAdapters/ormNameToOrm.dictionary";

const app = async () => {
    console.log("app start");

    const config = await getConfig("/Users/mundane/repos/miguard/.miguardrc.json");
    console.log("Cofiguration file found:", config);

    const databaseAdapter = dbEngineToAdapter[config.database.engine];
    const ormAdapter = ormNameToOrm[config.orm];
    const isInSyncWithAdapters = isInSync(databaseAdapter, ormAdapter);
    const inInSyncForCurrentConfig: () => Promise<IIsInSyncResponse> = _.bind(isInSyncWithAdapters, null, config.migrationsFolderPath, config.database);

    inInSyncForCurrentConfig()
        .then((inSync) => {
            console.log(inspect(inSync, false, null, true));
        })
        .catch(console.log);

    watchFilesChanges(config.migrationsFolderPath)
        .on('all', (event, path) => {
            inInSyncForCurrentConfig()
                .then((inSync) => {
                    console.log(inspect(inSync, false, null, true));
                })
                .catch(console.log);
        });
};

app();
import {DatabaseEngines} from "../interfaces/database.interfaces";
import {IDbAdapter} from "./dbAdapter.interfaces";
import postgresAdapter from "./Postgres.adapter";

const dbEngineToAdapter: {[key in DatabaseEngines]: IDbAdapter} = {
    [DatabaseEngines.POSTGRES]: postgresAdapter
};

export {dbEngineToAdapter}
import {IOrmAdapter, Orms} from "./ormAdapter.interfaces";
import typeOrmAdapter from "./TypeORM";

const ormNameToOrm: {[key in Orms]: IOrmAdapter} = {
    [Orms.TYPE_ORM]: typeOrmAdapter
};

export {ormNameToOrm}

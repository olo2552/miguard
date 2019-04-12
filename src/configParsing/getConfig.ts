import * as _ from "lodash";

import {IConfigFileInterface} from "./configFile.interface";
import {getConfigFileContent} from "./getConfigFileContent";
import {parseJsonConfig} from "./parseJsonConfig";

const getConfig = async (configPath: string): Promise<IConfigFileInterface> => {
    const rawConfigFileContent = await getConfigFileContent(configPath);
    const parsedJsonConfig = parseJsonConfig(_.toString(rawConfigFileContent));

    return parsedJsonConfig
};

export {getConfig}

import {promises as fsPromises} from "fs";

const getConfigFileContent = (jsonConfigInput: string) => {
    return fsPromises
        .readFile(jsonConfigInput)
        .catch((error) => {
            console.error("Migrations folder path is invalid, of is not a folder.");
            process.exit(1)
        })
};

export {getConfigFileContent}

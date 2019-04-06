import * as chokidar from "chokidar"
import {FSWatcher} from "chokidar";

const watchFilesChanges = (path: string): FSWatcher => {
    return chokidar.watch(path, {
        persistent: true,
        ignoreInitial: true,
        followSymlinks: true,
        disableGlobbing: false,
        usePolling: true,
        interval: 1000,
        binaryInterval: 1000000000000,
        alwaysStat: false,
        depth: 1,
        awaitWriteFinish: false,
        ignorePermissionErrors: false,
        atomic: 100
    });
};

export {watchFilesChanges}

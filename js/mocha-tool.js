const glob = require("glob");
const Mocha = require("mocha");
const promisify = require("util").promisify;
const p_glob = promisify(glob);


/**
 * Add files to Mocha's file list using single or multiple strings
 * or glob patterns.  Asynchronous.
 * 
 * @param {(string|array[string])} includes one or more
 * patterns that are either explicit file name or glob patterns.
 * These indicate which files should be included in the test file set.
 * 
 * @param {(string|array[string])=} excludes one or more
 * patterns that are either explicit file name or glob patterns.  These
 * indicate which files should be removed from the 'includes' set.
 * 
 * @return Promise which resolves with the file list, or rejects with
 * the error.
 */
Mocha.prototype.addFiles = async function (includes, excludes) {
    if (!Array.isArray(includes)) {
        includes = [includes];
    }
    let incFiles = [];
    for (let pattern of includes) {
        let files = await p_glob(pattern);
        files = files.filter(n => n.endsWith(".js"));
        incFiles = incFiles.concat(files);
    }
    if (excludes) {
        if (!Array.isArray(excludes)) {
            excludes = [excludes];
        }
        let excFiles = [];
        for (let pattern of excludes) {
            let files = await p_glob(pattern);
            files = files.filter(n => n.endsWith(".js"));
            excFiles = excFiles.concat(files);
        }
        for (let excFile of excFiles) {
            incFiles.remove(excFile);
        }
    }
    if (incFiles.length === 0) {
        throw new Error("your pattern(s) found no files");
    }
    this.files = this.files.concat(incFiles);
    return incFiles;
};

/**
 * Add files to Mocha's file list using single or multiple strings
 * or glob patterns.  Then run them.  Asynchronous.
 * 
 * @param {(string|array[string])} includes one or more
 * patterns that are either explicit file name or glob patterns.
 * These indicate which files should be included in the test file set.
 * 
 * @param {(string|array[string])=} excludes one or more
 * patterns that are either explicit file name or glob patterns.  These
 * indicate which files should be removed from the 'includes' set.
 * 
 * @return Promise which resolves with true, or rejects with a message
 */
Mocha.prototype.runFiles = async function (includes, excludes) {
    await this.addFiles(includes, excludes);
    return this.run((err) => {
        return err;
    });
};

module.exports = Mocha;
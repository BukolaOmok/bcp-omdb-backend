/**
 * Returns the value of the given environment variable, or throws an error if it does not exist.
 * @param {string} key the key of the environment variable to obtain
 */
export function getEnvironmentVariableOrFail(key) {
    const foundValue = process.env[key];
    if (!foundValue) {
        throw new Error(
            `Missing expected environment variable: ${key}.  Have you set it in an .env file or via host UI?`
        );
    }
    return foundValue;
}

import { getInput, setFailed } from '@actions/core';
import { exchangeApiKeyForToken } from './exchangeApiKeyForToken';
import { getAppConfiguration } from './getAppConfiguration';
import { saveAppConfiguration } from './saveAppConfiguration';
import { getNewContainerTemplate } from './getNewContainerTemplate';
import { parseEnvironmentVariables } from './parseEnvironmentVariables';
const apiKey = getInput("api_key", { required: true });
const appId = getInput("app_id", { required: true });
const containerName = getInput("container_name", { required: true });
const imageTag = getInput("image_tag", { required: true });
const port = getInput("port", { required: true });
const environmentVariables = parseEnvironmentVariables(getInput("environment_variables", { required: false }));
try {
    const token = await exchangeApiKeyForToken(apiKey);
    const appConfig = await getAppConfiguration(token, appId);
    const containerIndex = appConfig.containerTemplates.findIndex(({ name }) => name === containerName);
    let container = appConfig.containerTemplates[containerIndex];
    if (container) {
        container.imageTag = imageTag;
        delete container.imageDigest;
        appConfig.containerTemplates[containerIndex] = container;
    }
    else {
        container = getNewContainerTemplate({
            containerName,
            imageTag,
            port: Number(port),
            environmentVariables
        });
        appConfig.containerTemplates.push(container);
    }
    await saveAppConfiguration(token, appId, appConfig);
}
catch (e) {
    if (typeof e === 'string' || e instanceof Error) {
        setFailed(e);
    }
    else {
        setFailed('Unexpected error');
    }
}

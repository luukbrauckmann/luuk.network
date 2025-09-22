import { getInput, setFailed } from "@actions/core";
import {
  exchangeApiKeyForToken,
  getAppConfiguration,
  saveAppConfiguration
} from "@local/shared";

const apiKey = getInput("api_key", { required: true });
const appId = getInput("app_id", { required: true });
const containerName = getInput("container_name", { required: true });

try {
  const token = await exchangeApiKeyForToken(apiKey);
  const appConfig = await getAppConfiguration(token, appId);

  const containerIndex = appConfig.containerTemplates.findIndex(
    ({ name }) => name === containerName
  );

  if (containerIndex > -1) {
    appConfig.containerTemplates.splice(containerIndex, 1);
  }

  await saveAppConfiguration(token, appId, appConfig);
} catch (e) {
  if (typeof e === "string" || e instanceof Error) {
    setFailed(e);
  } else {
    setFailed("Unexpected error");
  }
}

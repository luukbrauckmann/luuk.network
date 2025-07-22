import { getInput, setFailed, setOutput } from '@actions/core';
import {
 exchangeApiKeyForToken,
 getAppConfiguration
} from '@local/shared';

const apiKey = getInput("api_key", { required: true });
const appId = getInput("app_id", { required: true });

try {
 const token = await exchangeApiKeyForToken(apiKey);
 const appConfig = await getAppConfiguration(token, appId);

 let highestPort = 4321;

 appConfig.containerTemplates?.forEach(container => {
   container.endpoints?.forEach(endpoint => {
     endpoint.cdn?.portMappings?.forEach(portMapping => {
       if (portMapping.containerPort && portMapping.containerPort > highestPort) {
         highestPort = portMapping.containerPort;
       }
     });
   });
 });

 const nextAvailablePort = highestPort + 1;
 setOutput('port', nextAvailablePort);
} catch (e) {
 if (typeof e === 'string' || e instanceof Error) {
   setFailed(e);
 } else {
   setFailed('Unexpected error');
 }
}

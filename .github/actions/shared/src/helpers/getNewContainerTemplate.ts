import type { ContainerTemplate } from "../types";
import { context } from '@actions/github';

export function getNewContainerTemplate({
  containerName,
  imageTag,
  port,
  environmentVariables
}: {
  containerName: string;
  imageTag: string;
  port: number;
  environmentVariables: Array<{
    name: string;
    value: string;
  }>
}): ContainerTemplate {
  const imageNamespace = context.repo.owner;
  const imageName = context.repo.repo;

  return {
    "packageId": "d2c1b95e-65e7-42a3-adb3-d27d9d1a4f72",
    "name": containerName,
    "imageName": imageName,
    "imageNamespace": imageNamespace,
    "imageTag": imageTag,
    "imageRegistryId": "2624",
    "imagePullPolicy": "Always",
    "environmentVariables": environmentVariables,
    "endpoints": [
      {
        "displayName": containerName,
        "cdn": {
          "isSslEnabled": true,
          "portMappings": [
            {
              "containerPort": port,
              "protocols": [
                "Tcp"
              ]
            }
          ]
        }
      }
    ]
  }
};

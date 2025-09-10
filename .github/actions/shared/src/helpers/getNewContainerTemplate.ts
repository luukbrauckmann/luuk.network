import type { ContainerTemplate } from "../types";
import { context } from '@actions/github';

export function getNewContainerTemplate(
  mainContainer: ContainerTemplate,
  {
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
  }
): ContainerTemplate {
  const imageNamespace = context.repo.owner;
  const imageName = context.repo.repo;

  delete mainContainer.imageDigest;

  return {
    ...mainContainer,
    "name": containerName,
    "imageName": imageName,
    "imageNamespace": imageNamespace,
    "imageTag": imageTag,
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

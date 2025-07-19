export type AppConfiguration = {
  id: string;
  containerTemplates: Array<ContainerTemplate>;
}

export type ContainerTemplate = {
  id?: string;
  packageId?: string;
  name: string;
  image?: string;
  imageName: string;
  imageNamespace: string;
  imageTag: string;
  imageDigest?: string | null;
  imageRegistryId: string;
  imagePullPolicy: string;
  environmentVariables: Array<{
    name: string;
    value: string;
  }>;
  endpoints: Array<{
    displayName: string;
    cdn: {
      isSslEnabled: boolean;
      stickySessions?: any | null;
      pullZoneId?: number;
      portMappings: Array<{
        containerPort: number;
        exposedPort?: number | null;
        protocols: string[];
      }>;
    };
  }>;
};

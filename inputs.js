{
    "organizationId": "string",
    "uniqueTopicId": "string",
    "configurationId": "string",
    "instanceName": "string",
    "clusterUrl": "string",
    "clusterProvider": "string",
    "clusterName": "string",
    "healthCheckUrl": "string",
    "healthCheckPort": "string",
    "configuration": {
      "akashMachineImageName": "string",
      "command": [
        "string"
      ],
      "args": [
        "string"
      ],
      "env": [
        {
          "value": "string",
          "isSecret": true
        }
      ],
      "image": "string",
      "tag": "string",
      "ports": [
        {
          "_id": "string",
          "containerPort": "string",
          "exposedPort": "string"
        }
      ],
      "protocol": "string"
    }
  }
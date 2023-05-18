const core = require("@actions/core");
const httpm = require("@actions/http-client");
const auth = require("@actions/http-client/lib/auth");

const mapPorts = (ports) => {
  return ports.split(",").map((port) => {
    const [containerPort, exposedPort] = port.split(":");
    return {
      containerPort,
      exposedPort,
    };
  });
};

const mapVariables = (variables) => {
  return variables.split(",").map((variable) => ({
    value: variable,
    isSecret: false,
  }));
};

const main = async () => {
  try {
    // inputs
    const token = core.getInput("spheron-token");
    const clusterName = core.getInput("cluster-name");
    const clusterUrl = core.getInput("image-url");
    const image = core.getInput("image");
    const tag = core.getInput("tag");
    const healthCheckUrl = core.getInput("health-check-path");
    const healthCheckPort = core.getInput("health-check-port");
    const akashMachineImageName = core.getInput("akash-machine-image-name");
    const inputPorts = core.getInput("ports");
    const inputVariables = core.getInput("environment-variables");
    const commands = core.getInput("commands");
    const args = core.getInput("args");

    const bearerToken = new auth.BearerCredentialHandler(token);

    const http = new httpm.HttpClient("http", [bearerToken]);
    const res = await http.get(
      "https://api-v2.spheron.network/v1/api-keys/scope"
    );
    console.log(res.message.statusCode);
    const body = JSON.parse(await res.readBody());
    console.log(body);

    const requestBody = {
      clusterName,
      clusterUrl,
      clusterProvider: "DOCKERHUB",
      organizationId: body.organizations[0].id,
      healthCheckUrl,
      healthCheckPort,
      configuration: {
        protocol: "akash",
        image,
        tag,
        instanceCount: 1,
        akashMachineImageName,
        ports: mapPorts(inputPorts),
        env: mapVariables(inputVariables),
        commands: commands.split(","),
        args: args.split(","),
      },
    };

    console.log(JSON.stringify(requestBody));
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();

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

    const bearerToken = new auth.BearerCredentialHandler(token);

    const http = new httpm.HttpClient("http", [bearerToken]);
    const res = await http.get(
      "https://api-v2.spheron.network/v1/api-keys/scope"
    );
    console.log(res.message.statusCode);
    const body = JSON.stringify(await res.readBody());
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
      },
    };
    console.log(requestBody);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();

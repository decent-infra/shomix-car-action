const core = require("@actions/core");
const httpm = require("@actions/http-client");
const auth = require("@actions/http-client/lib/auth");

const main = async () => {
  try {
    const time = new Date().toTimeString();
    console.log(`Time: ${time}`);
    core.setOutput("time", time);

    const bearerToken = new auth.BearerCredentialHandler(
      core.getInput("spheron-token")
    );

    const http = new httpm.HttpClient("http", [bearerToken]);
    const res = await http.get(
      "https://api-v2.spheron.network/v1/api-keys/scope"
    );
    console.log(res.message.statusCode);
    const body = await res.readBody();
    console.log(body);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();

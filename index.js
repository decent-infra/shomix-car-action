const core = require("@actions/core");
const github = require("@actions/github");
const httpm = require("@actions/http-client");

const main = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    //   const nameToGreet = core.getInput("who-to-greet");
    //   console.log(`Hello ${nameToGreet}!`);
    const time = new Date().toTimeString();
    console.log(`Time: ${time}`);
    core.setOutput("time", time);

    const http = new httpm.HttpClient();
    const res = await http.get(
      "http://4gpqnjktgtegbem7duhsarii2k.ingress.america.computer/"
    );
    console.log(res);
    console.log(res.message.statusCode);
    const body = await res.readBody();
    console.log(body);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();

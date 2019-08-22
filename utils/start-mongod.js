const { spawn } = require("child_process");

// on your local machine (bbut not in Travis) you need to launch mongod before using it
if (!process.env.CI) {
  spawn("mongod", ["--config", "/usr/local/etc/mongod.conf"]);
}

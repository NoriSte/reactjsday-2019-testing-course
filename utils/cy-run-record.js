const npm = require("npm");

npm.load(() => {
  let args = process.argv;

  // remove "node" and the script itself
  args = args.slice(2, args.length);

  args.unshift("cy:run");
  if (process.env.CYPRESS_RECORD_KEY) {
    args.push("--record", process.env.CYPRESS_RECORD_KEY);
  }

  npm["run-script"](args);
});

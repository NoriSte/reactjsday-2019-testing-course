const npm = require("npm");

// the goal is adding the "--record <CYPRESS_RECORD_KEY>" option only if needed

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

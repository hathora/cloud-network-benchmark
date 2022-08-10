import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import runTest from "./benchmark.js";

const { argv } = yargs(hideBin(process.argv))
  .option("regions", {
    alias: "r",
    demandOption: false,
    default: ["useast", "uswest", "southindia", "singapore", "london", "saopaulo"],
    describe: "Regions to benchmark",
    type: "array",
  })
  .option("providers", {
    alias: "p",
    demandOption: false,
    default: ["fly", "aws-ga", "aws-ec2", "azure", "gcp", "do", "contabo"],
    describe: "Providers to benchmark",
    type: "array",
  })
  .option("num-pings", {
    alias: "n",
    demandOption: false,
    default: 50,
    describe: "number of pings per server",
    type: "number",
  })
  .option("packet-size", {
    alias: "s",
    demandOption: false,
    default: 100,
    describe: "packet size in bytes",
    type: "number",
  })
  .option("output", {
    alias: "o",
    demandOption: false,
    describe: "output filename",
    type: "string",
  });

runTest(argv.regions, argv.providers, argv.output, argv.n, argv.s);

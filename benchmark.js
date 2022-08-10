import { Stats } from "fast-stats";
import WebSocket from "ws";
import fs from "fs";
import axios from "axios";
import crypto from "crypto";

const flyRegionNames = {
  useast: "iad",
  uswest: "sea",
  southindia: "maa",
  singapore: "sin",
  london: "lhr",
  saopaulo: "gru",
};

async function pingServer(region, provider, outfilePath, numRequests, packetSize) {
  const url = `${region}.${provider}.benchmarking.hathora.io`;
  const headers = { "Fly-Prefer-Region": flyRegionNames[region] };
  const buf = crypto.randomBytes(packetSize);
  try {
    await axios.get(`http://${url}`);
  } catch (e) {
    console.log(`Server unreachable for (${region}, ${provider}):`, e.message);
    return;
  }
  try {
    const stats = new Stats();
    const wsConn = new WebSocket(`ws://${url}`, { headers });
    wsConn.onopen = async () => {
      for (let i = 0; i < numRequests; i++) {
        let t1 = performance.now();
        await makeWebsocketRequest(wsConn, buf);
        const t2 = performance.now();
        stats.push(t2 - t1);
      }
      wsConn.close();

      // Run stats
      const jitter = calcJitter(stats.data);
      console.log(
        `${provider}-${region} min=${stats.range()[0].toFixed(2)} median=${stats.median().toFixed(2)} p90=${stats
          .percentile(90)
          .toFixed(2)} jitter=${jitter.toFixed(2)}`
      );
      if (outfilePath !== undefined) {
        writeFile(outfilePath, provider, region, stats.data);
      }
    };
  } catch (e) {
    console.log(`Error for ${provider}-${region}:`, e);
  }
}

function writeFile(fileName, provider, region, pingVals) {
  const buffer = pingVals.map((d) => `${provider},${region},${d}`).join("\n") + "\n";
  fs.appendFileSync(fileName, buffer);
}

function calcJitter(pingVals) {
  let sumOfDiffs = 0;
  for (let i = 0; i < pingVals.length - 1; i++) {
    sumOfDiffs += Math.abs(pingVals[i] - pingVals[i + 1]);
  }
  return sumOfDiffs / (pingVals.length - 1);
}

async function makeWebsocketRequest(wsConn, buf) {
  return new Promise((resolve) => {
    wsConn.onmessage = () => resolve();
    wsConn.send(buf);
  });
}

export default function runTest(regions, providers, outfilePath, numRequests, packetSize) {
  regions.forEach((region) =>
    providers.forEach(async (provider) => {
      pingServer(region, provider, outfilePath, numRequests, packetSize);
    })
  );
}

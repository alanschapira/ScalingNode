const cluster = require("cluster");
const { setupApp } = require("./setupApp");
const { once } = require("events");

if (cluster.isMaster) {
  const { pid } = process;
  console.log(`Master process id: ${pid}`);
  const cpusToUse = Array.from(Array(2));
  console.log("Clustering to " + cpusToUse.length + " processes");
  cpusToUse.forEach(cluster.fork);
  process.on("SIGUSR2", async () => {
    const workers = Object.values(cluster.workers);
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect(); // graceful disconnect - waits for all requests to finish
      await once(worker, "exit");
      if (!worker.exitedAfterDisconnect) {
        continue;
      }
      const newWorker = cluster.fork();
      await once(newWorker, "listening"); // Dont start next one till this is finished
    }
  });
} else {
  setupApp();
}

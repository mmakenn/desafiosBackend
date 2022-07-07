import { SERVER_MODE, PORT } from "../options.js";
import { createCluster } from "./cluster.js";
import { createServer } from "./server.js";

if (SERVER_MODE === 'cluster') {
    createCluster(PORT)
} else {
    createServer(PORT)
}
import { server_mode, port } from "../options.js";
import { createCluster } from "./cluster.js";
import { createServer } from "./server.js";

if (server_mode === 'cluster') {
    createCluster(port)
} else {
    createServer(port)
}
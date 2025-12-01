import { formatUptime } from "./uptimeFormater.js";
import { getRequestCount } from "./requestCounter.js";

export function getStatus(req, res) {
    const uptimeInSeconds = process.uptime();
    const uptime = formatUptime(uptimeInSeconds);
    const totalRequests = getRequestCount();

    return res.json({
        uptime, totalRequests
    });
}
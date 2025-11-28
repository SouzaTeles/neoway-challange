import { formatUptime } from "./uptimeFormater.js";
export function getStatus(req, res) {

    const uptimeInSeconds = process.uptime();
    const uptime = formatUptime(uptimeInSeconds);

    return res.json({
        consultas: 'ok',
        uptime: uptime
    }); 
}
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

const padUnit = (unit) => String(unit).padStart(2, '0');

function getTimeComponents(totalSeconds) {
    const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
    const hours = Math.floor((totalSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);
    return { days, hours, minutes, seconds };
}

function formatTimeComponents({ days, hours, minutes, seconds }) {
    const parts = [];
    if (days > 0) {
        parts.push(padUnit(days));
    }
    parts.push(padUnit(hours));
    parts.push(padUnit(minutes));
    parts.push(padUnit(seconds));
    return parts.join(':');
}

export function formatUptime(totalSeconds) {
    const components = getTimeComponents(totalSeconds);
    return formatTimeComponents(components);
}

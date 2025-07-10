// Implemented a pub-sub pattern in metricsStore.js
let metrics = [];
let listeners = []; // Array to hold subscriber callbacks functions

export function saveMetric(metric) {
    metrics.push(metric);
    listeners.forEach((cb) => cb(metrics));
}

export function getMetrics() {
    return metrics;
}

export function subscribe(cb) {
    listeners.push(cb);
    return () => {
        listeners = listeners.filter((l) => l !== cb);
    };
}

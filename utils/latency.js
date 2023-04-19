// Latency
const calculateLatency = (timestamp) => {
    const now = Date.now();
    const latency = now - timestamp;
    return latency.toFixed(2);

};

module.exports = { calculateLatency };
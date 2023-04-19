// Throughput
let last_throughput_timestamp = 0;
// let throughput_sum = 0;
// let throughput_count = 0;
const calculateThroughput = (messageSize) => {
    const now = Date.now();
    const throughput = (messageSize * 8) / ((now - last_throughput_timestamp) / 1000); // bits per second (bps)
    // throughput_sum += throughput;
    // throughput_count += 1;
    last_throughput_timestamp = now;

    return throughput.toFixed(2);
};

module.exports = { calculateThroughput };
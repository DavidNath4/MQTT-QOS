
// QOS INDEX
const calculateQos = (throughput, packetLoss, jitter, latency) => {
    let throughputIndex, packetLossIndex, jitterIndex, latencyIndex;

    const Perfect = "Perfect";
    const Good = "Good";
    const Medium = "Medium";
    const Poor = "Poor";

    // Calculate Throughput Index
    if (throughput > 100) {
        throughputIndex = Perfect;
    } else if (throughput >= 75 && throughput < 100) {
        throughputIndex = Good;
    } else if (throughput >= 50 && throughput < 75) {
        throughputIndex = Medium;
    } else {
        throughputIndex = Poor;
    }

    // Calculate Packet Loss Index
    if (packetLoss === 0) {
        packetLossIndex = Perfect;
    } else if (packetLoss >= 3 && packetLoss <= 15) {
        packetLossIndex = Good;
    } else if (packetLoss > 15 && packetLoss <= 25) {
        packetLossIndex = Medium;
    } else {
        packetLossIndex = Poor;
    }

    // Calculate Jitter Index
    if (jitter === 0) {
        jitterIndex = Perfect;
    } else if (jitter >= 0 && jitter <= 75) {
        jitterIndex = Good;
    } else if (jitter > 75 && jitter <= 125) {
        jitterIndex = Medium;
    } else {
        jitterIndex = Poor;
    }

    // Calculate Latency Index
    if (latency <= 150) {
        latencyIndex = Perfect;
    } else if (latency > 150 && latency <= 300) {
        latencyIndex = Good;
    } else if (latency > 300 && latency < 450) {
        latencyIndex = Medium;
    } else {
        latencyIndex = Poor;
    }

    return {
        latency: latencyIndex,
        jitter: jitterIndex,
        throughput: throughputIndex,
        packetLoss: packetLossIndex,
    };
};

module.exports = { calculateQos };
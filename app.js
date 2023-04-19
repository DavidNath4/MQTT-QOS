const mqtt = require('mqtt');
const brokerHost = 'mqtt://test.mosquitto.org';
// const brokerHost = 'mqtt://test.mosquitto.org';
const client = mqtt.connect(brokerHost);
const topic = 'PNJ/FHhMOe/TERRA';

// Latency
const calculateLatency = (timestamp) => {
    const now = Date.now();
    const latency = now - timestamp;
    return latency.toFixed(2);

};


// Jitter
let last_timestamp = 0;
let last_latency = 0;
let jitter_sum = 0;
let jitter_count = 0;
const calculateJitter = (latency) => {
    if (last_timestamp > 0) {
        const jitter = Math.abs(latency - last_latency);
        jitter_sum += jitter;
        jitter_count += 1;

        return jitter.toFixed(2);
    }

    last_timestamp = Date.now();
    last_latency = latency;
};


// Throughput
let last_throughput_timestamp = 0;
let throughput_sum = 0;
let throughput_count = 0;
const calculateThroughput = (messageSize) => {
    const now = Date.now();
    const throughput = (messageSize * 8) / ((now - last_throughput_timestamp) / 1000); // bits per second (bps)
    throughput_sum += throughput;
    throughput_count += 1;
    last_throughput_timestamp = now;

    return throughput.toFixed(2);
};


// Packet Loss
let last_packet_count = 0;
let lost_packet_count = 0;
const calculatePacketLoss = (packet_count) => {
    if (last_packet_count > 0) {
        const packets_lost = packet_count - last_packet_count - 1;
        if (packets_lost > 0) {
            lost_packet_count += packets_lost;
        }
    }
    last_packet_count = packet_count;
    return ((lost_packet_count / packet_count) * 100);
};

let packet_count = 0;

// QOS INDEX
const calculateQos = (throughput, packetLoss, jitter, latency) => {
    let throughputIndex, packetLossIndex, jitterIndex, latencyIndex;

    // Calculate Throughput Index
    if (throughput > 100) {
        throughputIndex = "Perfect";
    } else if (throughput >= 75 && throughput < 100) {
        throughputIndex = "Good";
    } else if (throughput >= 50 && throughput < 75) {
        throughputIndex = "Fair";
    } else {
        throughputIndex = "Poor";
    }

    // Calculate Packet Loss Index
    if (packetLoss === 0) {
        packetLossIndex = "Perfect";
    } else if (packetLoss >= 3 && packetLoss <= 15) {
        packetLossIndex = "Good";
    } else if (packetLoss > 15 && packetLoss <= 25) {
        packetLossIndex = "Fair";
    } else {
        packetLossIndex = "Poor";
    }

    // Calculate Jitter Index
    if (jitter === 0) {
        jitterIndex = "Perfect";
    } else if (jitter > 0 && jitter <= 75) {
        jitterIndex = "Good";
    } else if (jitter > 75 && jitter <= 125) {
        jitterIndex = "Fair";
    } else {
        jitterIndex = "Poor";
    }

    // Calculate Latency Index
    if (latency <= 150) {
        latencyIndex = "Perfect";
    } else if (latency > 150 && latency <= 300) {
        latencyIndex = "Good";
    } else if (latency > 300 && latency < 450) {
        latencyIndex = "Fair";
    } else {
        latencyIndex = "Poor";
    }

    return {
        latency: latencyIndex,
        jitter: jitterIndex,
        throughput: throughputIndex,
        packetLoss: packetLossIndex,
    };
};



// MQTT CONNECTION
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic);
});

// RECEIVED MESSAGE
client.on('message', (topic, message) => {
    packet_count++;
    const data = message.toString();
    const dataTime = data.split('-')[1];

    const timestamp = parseInt(dataTime.toString());
    const messageSize = Buffer.byteLength(data, 'utf8');




    const latency = calculateLatency(timestamp);
    console.log(`Latency: ${latency} ms`);

    const jitter = calculateJitter(latency);
    console.log(`Jitter: ${jitter} ms`);

    const throughput = calculateThroughput(messageSize);
    console.log(`Throughput: ${throughput} bps`);

    const packet_loss = calculatePacketLoss(packet_count);
    console.log(`Packet Loss: ${packet_loss} %`);

    console.log('');

    console.log(calculateQos(throughput, packet_loss, jitter, latency));
    console.log('\n');

});


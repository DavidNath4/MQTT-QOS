const mqtt = require('mqtt');
const brokerHost = 'mqtt://test.mosquitto.org';
// const brokerHost = 'mqtt://192.168.100.52';
const client = mqtt.connect(brokerHost);
const topic = 'PNJ/FHhMOe/TERRA';

const { calculateLatency } = require('./utils/latency');
const { calculateJitter } = require('./utils/jitter');
const { calculateThroughput } = require('./utils/throughput');
const { calculatePacketLoss } = require('./utils/packetLoss');
const { calculateQos } = require('./utils/qos');

let packet_count = 0;


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

    // console.log(calculateQos(throughput, packet_loss, jitter, latency));
    // console.log('\n');

});


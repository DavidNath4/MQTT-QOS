// Jitter
// let last_timestamp = 0;
// let last_latency = 0;
// // let jitter_sum = 0;
// // let jitter_count = 0;
// const calculateJitter = (latency) => {
//     if (last_timestamp > 0) {
//         const jitter = Math.abs(latency - last_latency);
//         // jitter_sum += jitter;
//         // jitter_count += 1;

//         return jitter.toFixed(2);
//     }

//     last_timestamp = Date.now();
//     last_latency = latency;
//     return 0;
// };

let last_latency = 0;
let total_delay_variation = 0;
let packet_count = 0;

const calculateJitter = (latency) => {
    if (last_latency > 0) {
        const delay_variation = Math.abs(latency - last_latency);
        total_delay_variation += delay_variation;
        packet_count += 1;
    }
    last_latency = latency;

    if (packet_count > 1) {
        const jitter = total_delay_variation / (packet_count - 1);
        return jitter.toFixed(2);
    } else {
        return 0;
    }
};


module.exports = { calculateJitter };
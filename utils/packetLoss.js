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

module.exports = { calculatePacketLoss };
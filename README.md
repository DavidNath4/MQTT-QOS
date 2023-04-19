this code is to calculate QOS with MQTT protocol

Latency(Delay)

latency = arrival time - send time

Jitter

jitter = |latency - last_latency| / (packet_count - 1)

Throughput

throughput = (message size \* 8) / (time interval)

where:

- message size: the size of the message in bits
- time interval: the time it takes for the message to be transmitted, typically measured in seconds

Packet Loss

Packet Loss (%) = (Number of Lost Packets ÷ Total Number of Sent Packets) x 100

This formula calculates the percentage of packets that were lost during transmission. The number of lost packets is divided by the total number of sent packets, and the result is multiplied by 100 to express the loss as a percentage.

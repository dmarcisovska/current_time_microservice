# Current Time Microservice

This microservice provides the current time  in a standard format using ZeroMQ's publisher-subscriber pattern. The service continuously send time messages.

## Prerequisites
- **Node.js** installed on your system

## Installation

Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/current-date-time-microservice.git
   cd current-date-time-microservice
```

## How to run

```
npm install
npm start
```

This command will start a ZeroMQ publisher bound to tcp://127.0.0.1:3000. You’ll see console logs for each message sent, with different date and time formats.

## Topics and Message Formats
The microservice publishes messages on the following topics:

- current_time: The current time as HH:MM:SS AM/PM (e.g., 11:30:15 AM)

## Example Subscriber Code

To receive messages from this microservice publisher, you need a ZeroMQ subscriber that connects to tcp://127.0.0.1:3000 and subscribes to time. Here’s an example:

```
import zmq from "zeromq";

async function run() {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:3000");

  sock.subscribe("current_time");

  for await (const [topic, message] of sock) {
    console.log(`Received ${topic.toString()}: ${message.toString()}`);
  }
}

run();

```






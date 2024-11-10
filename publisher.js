import zmq from "zeromq";

async function run() {
  const sock = new zmq.Publisher();

  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Publisher bound to port 3000");

  while (true) {
    const current_time = new Date();
    const hours = current_time.getHours();
    const minutes = current_time.getMinutes();
    const seconds = current_time.getSeconds();

    
    const messages = {
      current_time: `${hours}:${minutes}:${seconds}`,
      current_hours: hours.toString(),
      current_minutes: minutes.toString(),
      current_seconds: seconds.toString(),
    }

    for (const [topic, message] of Object.entries(messages)) {
      console.log(`Sending ${topic}: ${message}`);
      await sock.send([topic, message]);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    })
  }
}

run();

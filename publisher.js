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

    const twelveHours = ((hours + 11) % 12) + 1; 
    const amPm = hours >= 12 ? 'PM' : 'AM';

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    
    const messages = {
      current_time:  `${twelveHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`,
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

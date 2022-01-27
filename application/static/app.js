import { Metacom } from './metacom.js';

class Application {
  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  }

  startBus() {
    api.bus.subscribe({ room: 'main' });
    api.bus.on('message', (data) => {
      switch (data.room) {
      case 'main':
        document.title = data.message;
        document
          .getElementById('counter').innerHTML = `Counter: ${data.message}`;
        break;
      }
    });
  }

  async incCounter() {
    api.bus.send({ room: 'main', message: await api.counter.inc() });
  }

  send(data) {
    api.bus.send(data);
  }
}

window.addEventListener('load', async () => {
  window.application = new Application();
  window.api = window.application.metacom.api;
  await application.metacom.load('counter', 'bus');
  application.startBus();
  application.incCounter();

});

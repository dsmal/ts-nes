import Bus from './bus/Bus';

const bus = new Bus();

bus.reset();

setInterval(() => bus.clock(), 100);

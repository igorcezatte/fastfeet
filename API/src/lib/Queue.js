import Bee from 'bee-queue';
import NewDeliveryMail from '../app/jobs/NewDeliveryMail';
import CancelDeliveryMail from '../app/jobs/CancelDeliveryMail';
import redisConfig from '../config/redis';

const jobs = [NewDeliveryMail, CancelDeliveryMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`FAIL on Queue: ${job.queue.name} ---`, err);
  }
}

export default new Queue();

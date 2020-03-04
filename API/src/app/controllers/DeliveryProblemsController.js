import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

class DeliveryProblemsController {
  async index(req, res) {
    const { delivery_id } = req.params;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id },
    });

    if (!deliveryProblems) {
      return res
        .status(400)
        .json({ message: 'This delivery has no problems associeted' });
    }

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { delivery_id } = req.params;

    const { description } = req.body;

    const deliveryExists = await Delivery.findByPk(delivery_id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery Id does not exist' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem Id does not exist' });
    }

    const delivery = await Delivery.findByPk(problem.delivery_id);

    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);

    if (delivery.end_date != null) {
      return res.status(400).json({
        error: 'This Delivery is already finished, you cannot cancel that',
      });
    }

    const updatedDelivery = await delivery.update({
      canceled_at: new Date(),
    });

    await Queue.add(CancelDeliveryMail.key, {
      deliveryman,
      delivery,
      problem,
    });

    return res.json(updatedDelivery);
  }
}

export default new DeliveryProblemsController();

import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemsController {
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
}

export default new DeliveryProblemsController();

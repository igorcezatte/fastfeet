import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryStatusController {
  async index(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman ID does not exist' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'uf',
            'city',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman Id not exist' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: {
          [Op.ne]: null,
        },
        canceled_at: null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'uf',
            'city',
            'neighborhood',
            'street',
            'number',
            'complement',
          ],
        },
      ],
    });

    if (!deliveries) {
      return res
        .status(400)
        .json({ error: 'You have not deliveries registered' });
    }

    return res.json(deliveries);
  }
}

export default new DeliveryStatusController();

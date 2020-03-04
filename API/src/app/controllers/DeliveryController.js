import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'zip_code',
            'number',
            'uf',
            'city',
            'neighborhood',
            'complement',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'name'],
        },
      ],
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    const recipient = await Recipient.findByPk(recipient_id);

    if (!(deliveryman || recipient)) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });
    }

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    await Queue.add(NewDeliveryMail.key, {
      deliveryman,
      recipient,
      product,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id, product } = req.body;

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery ID not found' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    const recipient = await Recipient.findByPk(recipient_id);

    if (!(deliveryman || recipient)) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });
    }

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const updatedDelivery = await delivery.update({
      product,
      deliveryman_id,
      recipient_id,
    });

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    await Delivery.destroy({ where: { id } });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery Id does not exist' });
    }

    return res.json({ message: `Id ${id} delivery has been deleted` });
  }
}

export default new DeliveryController();

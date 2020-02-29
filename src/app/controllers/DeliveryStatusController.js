import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  parseISO,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
  isAfter,
  startOfDay,
  endOfDay,
} from 'date-fns';

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

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliverymanId, deliveryId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    const delivery = await Delivery.findByPk(deliveryId);

    if (!deliveryman && !delivery) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Delivery does not exists' });
    }

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const startDate = parseISO(req.body.start_date);
    const endDate = parseISO(req.body.end_date);
    if (req.body.end_date) {
      const { signature_id } = req.body;
    }

    if (req.body.start_date && req.body.end_date) {
      return res.status(400).json({
        error: 'You cannot register start and end dates at the same time.',
      });
    }

    if (delivery.start_date && req.body.start_date) {
      return res
        .status(400)
        .json({ error: 'There is already a start date this delivery' });
    }

    if (isBefore(startDate, endDate)) {
      return res
        .status(400)
        .json({ error: 'End date must be after the start date' });
    }

    const beginPeriod = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
    const endPeriod = setSeconds(setMinutes(setHours(startDate, 18), 0), 0);

    if (isAfter(startDate, endPeriod) || isBefore(startDate, beginPeriod)) {
      return res.status(400).json({
        error:
          'You cannot update the delivery status at now. The registration period is between 08:00 and 18:00h',
      });
    }

    const deliveriesPerDay = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if (deliveriesPerDay.length > 5) {
      return res
        .status(400)
        .json({ error: 'you can only deliver five deliveries a day' });
    }

    if (req.body.end_date) {
      const status = await delivery.update(req.body, {
        attributes: ['start_date', 'end_date', 'signature_id'],
      });

      return res.json(status);
    }

    const status = await delivery.update(req.body, {
      attributes: ['start_date', 'end_date'],
    });

    return res.json(status);
  }
}

export default new DeliveryStatusController();

import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      attributes: ['name', 'email'],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { name: req.body.name },
    });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'This name is already used for another deliveryman' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (name && name !== deliveryman.name) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { name: req.body.name },
      });

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: 'This name is already used for another Recipient' });
      }
    }

    const updatedDeliveryman = await deliveryman.update(req.body);

    return res.json(updatedDeliveryman);
  }
}

export default new DeliverymanController();

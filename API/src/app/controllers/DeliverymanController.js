import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

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
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'This email is already used for another deliveryman' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, avatar_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman ID not found' });
    }

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: 'This email is already used for another Recipient' });
      }
    }

    const avatar = await File.findByPk(avatar_id);

    if (!avatar) {
      return res.status(400).json({ error: 'Avatar id does not exist' });
    }

    const updatedDeliveryman = await deliveryman.update(req.body);

    return res.json(updatedDeliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    const name = deliveryman ? deliveryman.name : null;

    await Deliveryman.destroy({ where: { id } });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman Id does not exist' });
    }

    return res.json({ message: `Deliveryman ${name} deleted` });
  }
}

export default new DeliverymanController();

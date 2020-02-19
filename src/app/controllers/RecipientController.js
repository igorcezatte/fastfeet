import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'uf',
        'city',
        'zip_code',
      ],
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      uf: Yup.string()
        .max(2)
        .required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res
        .status(400)
        .json({ error: 'This name is already used for another Recipient' });
    }

    const {
      name,
      street,
      number,
      complement,
      uf,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({ name, street, number, complement, uf, city, zip_code });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      uf: Yup.string().max(2),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const recipient = await Recipient.findByPk(req.params.id);

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({
        where: { name: req.body.name },
      });

      if (recipientExists) {
        return res
          .status(400)
          .json({ error: 'This name is already used for another Recipient' });
      }
    }

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }
}

export default new RecipientController();

import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
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
        .json({ error: 'This Recipient is already registered in application' });
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
}

export default new RecipientController();

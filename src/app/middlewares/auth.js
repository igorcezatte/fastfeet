import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import User from '../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Invalid user' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    const userLogged = await User.findByPk(req.userId);

    if (!userLogged.admin) {
      return res.status(400).json({ error: 'Only administrator can do this' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};

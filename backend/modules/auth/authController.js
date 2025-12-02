import jwt from 'jsonwebtoken';
import { userRepository } from './userRepository.js';

const JWT_SECRET = 'secret';
const JWT_EXPIRES_IN = '1h';
const ONE_HOUR = 1000 * 60 * 60;

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: ONE_HOUR
      })
      .json({ message: 'Login realizado com sucesso' });
  },

  logout: (req, res) => {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Logout realizado com sucesso' });
  },
};

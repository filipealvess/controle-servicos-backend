import bcrypt from 'bcryptjs';
import connect from '../database/setup.js';
import { paramsAreUndefined } from './globalController.js';

function encodePassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export async function create(request, response) {
  try {
    const { name, email, password } = request.body;
    const paramsAreNotValid = paramsAreUndefined(name, email, password);

    if (paramsAreNotValid) throw new Error('Missing parameters');

    const connection = await connect();
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', email);

    if (users.length > 0) throw new Error('Already exists an user with this email address');

    const SQL = 'INSERT INTO users (name, email, password) VALUE (?, ?, ?)';
    const encodedPassword = encodePassword(password);

    await connection.query(SQL, [name, email, encodedPassword]);

    response.status(201).json({ data: { name, email } });
  } catch ({ message }) {
    response.status(400).json({ error: message });
  }
}

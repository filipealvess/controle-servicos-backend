import bcrypt from 'bcryptjs';
import connect from '../database/setup.js';
import { paramsAreUndefined } from './globalController.js';

function encodePassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

function passwordIsCorrect(password, hash) {
  return bcrypt.compareSync(password, hash);
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

    const [result] = await connection.query(SQL, [name, email, encodedPassword]);

    response.status(201).json({ data: { id: result.insertId, name, email } });
  } catch ({ message }) {
    response.status(400).json({ error: message });
  }
}

export async function login(request, response) {
  try {
    const { email, password } = request.body;
    const paramsAreNotValid = paramsAreUndefined(email, password);

    if (paramsAreNotValid) throw new Error('Missing parameters');

    const errorMessage = 'Email and/or password are incorrect';
    const connection = await connect();
    const SQL = 'SELECT * FROM users WHERE email = ?';
    const [users] = await connection.query(SQL, email);

    if (users.length === 0) throw new Error(errorMessage);

    const user = users[0];
    const passwordIsIncorrect = !passwordIsCorrect(password, user.password);

    if (passwordIsIncorrect) throw new Error(errorMessage);

    response.status(200).json({ data: { id: user.id, name: user.name, email } });
  } catch ({ message }) {
    response.status(400).json({ error: message });
  }
}

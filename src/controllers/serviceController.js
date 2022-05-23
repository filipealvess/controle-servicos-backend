import connect from '../database/setup.js';
import { paramsAreUndefined } from './globalController.js';

export async function create(request, response) {
  try {
    const { userID, name, description, defaultPrice } = request.body;
    const paramsAreNotValid = paramsAreUndefined(userID, name, description, defaultPrice);

    if (paramsAreNotValid) {
      return response.status(400).json({ error: 'Missing parameters' });
    };

    const SQL = 'INSERT INTO services (user_id, name, description, default_price) VALUE (?, ?, ?, ?)';
    const connection = await connect();
    const [result] = await connection.query(SQL, [userID, name, description, defaultPrice]);
    const serviceID = result.insertId;

    response.status(201).json({ data: { id: serviceID, name, description, defaultPrice } });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
}

export async function list(request, response) {
  try {
    const { userID } = request.params;
    const paramsAreNotValid = paramsAreUndefined(userID);

    if (paramsAreNotValid) {
      return response.status(400).json({ error: 'Missing parameters' });
    };

    const SQL = 'SELECT * FROM services WHERE user_id = ? ORDER BY name ASC';
    const connection = await connect();
    const [data] = await connection.query(SQL, userID);

    response.status(200).json({ data });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
}

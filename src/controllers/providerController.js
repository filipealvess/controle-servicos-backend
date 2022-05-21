import connect from '../database/setup.js';
import { paramsAreUndefined } from './globalController.js';

export async function create(request, response) {
  try {
    const { userID, imagePath, name, phone, email, services } = request.body;
    const paramsAreNotValid = paramsAreUndefined(userID, imagePath, name, phone, email, services);

    if (paramsAreNotValid) throw new Error('Missing parameters');

    let SQL = 'INSERT INTO providers (user_id, image_path, name, phone, email) VALUE (?, ?, ?, ?, ?)';
    const connection = await connect();
    const [result] = await connection.query(SQL, [userID, imagePath, name, phone, email]);
    const providerID = result.insertId;
    
    SQL = `
      INSERT INTO prices (provider_id, service_id, price)
      VALUES ${services.map(() => '(?, ?, ?)').join(', ')}
    `;

    const data = services.reduce((data, { id, price }) => [...data, providerID, id, price], []);

    await connection.query(SQL, data);

    response.status(201).json({ data: { id: providerID, imagePath, name, phone, email, services } });
  } catch ({ message }) {
    response.status(400).json({ error: message });
  }
}
import connect from '../database/setup.js';
import { paramsAreUndefined } from './globalController.js';

const ITEMS_PER_PAGE = 10;

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

export async function list(request, response) {
  try {
    const { userID } = request.params;
    const { page } = request.query;
    const connection = await connect();
    const currentPage = page ? Number(page) : 1;
    
    let SQL = 'SELECT COUNT(id) AS amount FROM providers WHERE user_id = ?';
    const [rows] = await connection.query(SQL, userID);
    const providersAmount = rows[0].amount;
    const completedPages = Math.floor(providersAmount / ITEMS_PER_PAGE);
    const remainingPages = Boolean(providersAmount % ITEMS_PER_PAGE);
    const pages = completedPages + remainingPages;

    SQL = 'SELECT * FROM providers WHERE user_id = ? LIMIT ? OFFSET ?';
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const [data] = await connection.query(SQL, [userID, ITEMS_PER_PAGE, offset]);

    response.status(200).json({ pages, currentPage, data });
  } catch ({ message }) {
    response.status(400).json({ error: message });
  }
}

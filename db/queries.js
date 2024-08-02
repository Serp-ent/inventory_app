const pool = require('./pool');

const getAllTrainers = async () => {
  const {rows} = await pool.query('SELECT * FROM trainer');

  console.log('trainers:', rows);

  return rows;
}

module.exports = {
  getAllTrainers,
}
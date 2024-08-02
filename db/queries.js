const pool = require('./pool');

const getAllTrainers = async () => {
  const { rows } = await pool.query('SELECT * FROM trainer');

  return rows;
}

const getAllPokemons = async () => {
  const { rows } = await pool.query('SELECT pokemon.name AS name, type.name AS type FROM pokemon LEFT JOIN type ON pokemon.type_id = type.id');

  return rows;
}

module.exports = {
  getAllTrainers,
  getAllPokemons,
}
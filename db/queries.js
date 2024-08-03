const pool = require('./pool');

const getAllTrainers = async () => {
  const { rows } = await pool.query('SELECT * FROM trainer');

  return rows;
}

const getAllPokemons = async () => {
  const { rows } = await pool.query('SELECT pokemon.name AS name, type.name AS type FROM pokemon LEFT JOIN type ON pokemon.type_id = type.id');

  return rows;
}

const getAllTrainersWithPokemons = async () => {
  const { rows } = await pool.query(`
     SELECT 
        t.id AS trainer_id, 
        t.name AS trainer_name, 
        p.name AS pokemon_name
      FROM 
        Trainer t
      LEFT JOIN 
        Pokemon p ON t.id = p.trainer_id
      UNION
      SELECT
        NULL AS trainer_id,
        'Wild' AS trainer_name,
        p.name AS pokemon_name
      FROM
        Pokemon p
      WHERE
        p.trainer_id IS NULL
      ORDER BY 
        trainer_name, pokemon_name;
    `);

  return rows;
}

const getTrainerNameFromId = async (id) => {
  const result = await pool.query('SELECT name FROM trainer WHERE id = $1', [id]);
  return result.rowCount > 0 ? result.rows[0].name : null;
}

const addTrainer = async (name, age) => {
  await pool.query('INSERT INTO trainer (name, age) VALUES ($1, $2)', [name, age]);
}

const getPokemonTypes = async () => {
  const { rows } = await pool.query('SELECT id, name FROM type');
  return rows;
}

const addPokemon = async (name, type_id, trainer_id) => {
  await pool.query("INSERT INTO pokemon (name, type_id, trainer_id) VALUES ($1, $2, $3)", [name, type_id, trainer_id]);
}

const removeTrainer = async (id) => {
  await pool.query('DELETE FROM trainer WHERE id = $1', [id]);
}

module.exports = {
  getAllTrainers,
  getAllPokemons,
  getAllTrainersWithPokemons,
  addTrainer,
  getTrainerNameFromId,
  getPokemonTypes,
  addPokemon,
  removeTrainer,
}
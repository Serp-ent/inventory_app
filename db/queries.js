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

const addTrainer = async (name, age) => {
  await pool.query('INSERT INTO trainer (name, age) VALUES ($1, $2)', [name, age]);
}

module.exports = {
  getAllTrainers,
  getAllPokemons,
  getAllTrainersWithPokemons,
  addTrainer,
}
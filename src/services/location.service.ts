import { query } from "../utils/db";

export async function cityExists(cityId: string){
  const queryResult = await query("SELECT * FROM Cities WHERE city_id = $1", [cityId]);
  return queryResult.rowCount > 0
}

// There might be duplicate city names. For now, do not handle them.
export async function getCities() {
    const queryResult = await query('SELECT city_name FROM Cities', []);
    const cities = queryResult.rows.map(cityObject => cityObject.city_name);
    return cities;
  }
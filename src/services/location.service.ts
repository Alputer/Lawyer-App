import { query } from "../utils/db";

// There might be duplicate city names. For now, do not handle them.
export async function getCities() {
    const queryResult = await query('SELECT city_name FROM Cities', []);
    const cities = queryResult.rows.map(cityObject => cityObject.city_name);
    return cities;
  }
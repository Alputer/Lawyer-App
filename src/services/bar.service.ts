import { query } from "../utils/db";

// There might be duplicate city names. For now, do not handle them.
export async function getBars(cityId: string) {
    const queryResult = await query('SELECT bar_name FROM Bars WHERE city_id = $1', [cityId]);
    const bars = queryResult.rows.map(barObject => barObject.bar_name);
    return bars;
  }
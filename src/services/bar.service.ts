import { query } from "../utils/db";

export async function barExists(barId: string) {
  const queryResult = await query("SELECT * FROM Bars WHERE bar_id = $1", [
    barId,
  ]);
  return queryResult.rowCount > 0;
}

// There might be duplicate city names. For now, do not handle them.
export async function getBars(cityId: string) {
  const queryResult = await query(
    "SELECT bar_name FROM Bars WHERE city_id = $1",
    [cityId]
  );
  const bars = queryResult.rows.map((barObject) => barObject.bar_name);
  return bars;
}

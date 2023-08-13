import Bar from "../models/bar.model";

export async function barExists(barId: string) {
  const bar = await Bar.findOne({
    where: {
      bar_id: barId,
    },
  });

  return bar !== null;
}

export async function getBars(cityId: string) {
  const bars = await Bar.findAll({
    attributes: ["bar_name"],
    where: {
      city_id: cityId,
    },
  });

  return bars.map((bar: { bar_name: any }) => bar.bar_name);
}

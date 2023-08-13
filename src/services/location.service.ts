import City from "../models/city.model";

export async function cityWithIdExists(cityId: string) {
  const city = await City.findOne({
    where: { city_id: cityId },
  });
  return !!city;
}

export async function cityWithNameExists(cityName: string) {
  const city = await City.findOne({
    where: { city_name: cityName },
  });
  return !!city;
}

export async function getCities() {
  const cities = await City.findAll({
    attributes: ["city_name"],
  });
  return cities.map((city: { city_name: any }) => city.city_name);
}

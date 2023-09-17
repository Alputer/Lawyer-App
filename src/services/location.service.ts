import { City } from "../models/city.model";

export async function cityWithIdExists(cityId: string) {
  const city = await City.findOne({ _id: cityId });

  return !!city;
}

export async function cityWithNameExists(cityName: string) {
  const city = await City.findOne({
    city_name: cityName,
  });
  return !!city;
}

export async function getCities() {
  const cities = await City.find().populate("bars");
  return cities;
}

export async function getBars(cityId: string) {
  const bars = await City.find(
    {
      _id: cityId,
    },
    "bars"
  ).populate("bars");

  return bars;
}

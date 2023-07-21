import { z, object, string, number, TypeOf} from "zod";

  const getBarsInTheCitySchema = object({
    params: object({
      cityId: string(),
    })
  });

export default {getBarsInTheCitySchema};
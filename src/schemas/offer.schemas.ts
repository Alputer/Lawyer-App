import { z, object, string, coerce} from "zod";

const makeOfferSchema = object({
    body: object({
      jobId: string({
        required_error: "Job Id is required",
      }),
    }),
  });

  const acceptOfferSchema = object({
    body: object({
      offerId: string({
        required_error: "Offer Id is required",
      }),
    }),
  });

  export default {makeOfferSchema, acceptOfferSchema};
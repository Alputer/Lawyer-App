import { CreateUserInput } from "../schemas/user.schemas";
import { hashPassword } from "./auth.service";
import { GetLawyersOptions, Lawyer, RatingInfo } from "../models/lawyer.model";
import { Rating } from "../models/rating.model";
import { SORT_OPTIONS } from "../utils/enums";
import { omit } from "lodash";

export async function userExists(userEmail: string) {
  const user = await Lawyer.findOne({
    email: userEmail,
  });
  return user != null;
}

export async function getUser(userEmail: string) {
  const user = await Lawyer.findOne(
    {
      email: userEmail,
    },
    "password_hash is_validated"
  );
  return user;
}

export async function createUser(
  input: CreateUserInput,
  verificationCode: string
) {
  const hashedPassword = await hashPassword(input.password);

  await Lawyer.create({
    email: input.email,
    password_hash: hashedPassword,
    firstname: input.firstname,
    lastname: input.lastname,
    verification_code: verificationCode,
    bar_id: input.barId,
  });

  return;
}

export async function updateProfile(
  email: string,
  age: string | null | undefined,
  phoneNumber: string | null | undefined,
  linkedinUrl: string | null | undefined
) {
  const updates: Record<string, any> = {};

  if (typeof age !== "undefined") {
    updates.age = age;
  }
  if (typeof phoneNumber !== "undefined") {
    updates.phone_number = phoneNumber;
  }
  if (typeof linkedinUrl !== "undefined") {
    updates.linkedin_url = linkedinUrl;
  }

  await Lawyer.updateOne(
    {
      email: email,
    },
    { lawyer_profile: updates }
  );

  return;
}

export async function rateLawyer(
  rater_id: string,
  rated_id: string,
  rating: number
) {
  await Rating.create({
    rater_id: rater_id,
    rated_id: rated_id,
    rating: rating,
  });

  let ratingInfo: RatingInfo = (await Lawyer.findOne(
    { _id: rated_id },
    "rating_info"
  )) as RatingInfo;

  if (!ratingInfo?.average_rating) {
    ratingInfo = { average_rating: 0, total_number_of_votes: 0 };
  }

  ratingInfo.average_rating =
    (ratingInfo.average_rating * ratingInfo.total_number_of_votes + rating) /
    (ratingInfo.total_number_of_votes + 1);
  ratingInfo.total_number_of_votes += 1;

  await Lawyer.updateOne({ _id: rated_id }, { rating_info: ratingInfo });

  return;
}

export async function getLawyer(userEmail: string) {
  const user = await Lawyer.findOne({
    email: userEmail,
  });

  return user;
}

export async function getLawyers(options: GetLawyersOptions) {
  const query: any = {};
  if (options.barId) {
    query.bar_id = options.barId;
  }

  if (options.minRating || options.maxRating) {
    query["rating_info.average_rating"] = {
      $gte: options.minRating || 0,
      $lte: options.maxRating || 5,
    };
  }

  if (options.lawyer_state) {
    query.lawyer_state = options.lawyer_state;
  }

  const pageSize = options.pageSize || 10;
  const page = options.page || 1;
  const skip = (page - 1) * pageSize;

  const lawyersQuery = Lawyer.find(query)
    .select([
      "email",
      "firstname",
      "lastname",
      "bar_id",
      "lawyer_state",
      "rating_info",
    ])
    .sort({
      "rating_info.average_rating": options.sort === SORT_OPTIONS.DESC ? -1 : 1,
    })
    .limit(pageSize)
    .skip(skip);

  const [lawyers, totalCount] = await Promise.all([
    lawyersQuery.exec(),
    Lawyer.countDocuments(query).exec(),
  ]);

  return {
    lawyers,
    totalCount,
  };
}

export async function getUserProfile(userEmail: string) {
  const userProfile = await Lawyer.findOne({
    email: userEmail,
  })
    .select("lawyer_profile")
    .exec();

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return omit(userProfile.toJSON(), "_id");
}

export async function getUserLocation(userEmail: string) {
  const userLocation = await Lawyer.findOne({ email: userEmail })
    .select("last_location")
    .exec();

  return userLocation
    ? userLocation?.last_location
      ? omit(userLocation.toJSON(), "_id")
      : null
    : null;
}

export async function updateUserLocation(userEmail: string, cityId: string) {
  const queryResult = await Lawyer.updateOne(
    {
      email: userEmail,
    },
    { last_location: cityId }
  );

  if (queryResult.modifiedCount === 0) {
    throw new Error("User not found");
  }

  return;
}

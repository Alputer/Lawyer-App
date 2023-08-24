import { CreateUserInput } from "../schemas/user.schemas";
import { hashPassword } from "./auth.service";
import City from "../models/city.model";
import Lawyer, {
  GetLawyersOptions,
  LawyerWithCity,
} from "../models/lawyer.model";
import LawyerProfile from "../models/lawyer_profile.model";
import Rating from "../models/rating.model";
import { SORT_OPTIONS } from "../enums/sort.enum";
import { Op } from "sequelize";

export async function userExists(userEmail: string) {
  const user = await Lawyer.findOne({
    where: {
      email: userEmail,
    },
  });
  return user != null;
}

export async function getUser(userEmail: string) {
  const user = await Lawyer.findOne({
    where: {
      email: userEmail,
    },
    attributes: ["password_hash", "is_validated"],
  });
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

  await LawyerProfile.create({
    email: input.email,
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

  await LawyerProfile.update(updates, {
    where: {
      email: email,
    },
  });

  return;
}

export async function rateLawyer(
  rater_email: string,
  rated_email: string,
  rating: number
) {
  await Rating.create({
    rater_email: rater_email,
    rated_email: rated_email,
    rating: rating,
  });

  return;
}

export async function getLawyer(userEmail: string) {
  const user = await Lawyer.findOne({
    where: {
      email: userEmail,
    },
  });

  return user;
}

export async function getLawyers(
  options: GetLawyersOptions
): Promise<{ lawyers: Lawyer[]; totalCount: number }> {
  const queryOptions: any = {
    attributes: [
      "email",
      "firstname",
      "lastname",
      "bar_id",
      "lawyer_state",
      "average_rating",
    ],
    order: [
      ["average_rating", options.sort === SORT_OPTIONS.DESC ? "DESC" : "ASC"],
    ],
    limit: options.pageSize,
    offset: (options.page - 1) * options.pageSize,
  };

  if (options.barId) {
    queryOptions.where = {
      ...queryOptions.where,
      bar_id: options.barId,
    };
  }

  if (options.minRating || options.maxRating) {
    queryOptions.where = {
      ...queryOptions.where,
      average_rating: {
        [Op.between]: [options.minRating || 0, options.maxRating || 5],
      },
    };
  }

  if (options.lawyer_state) {
    queryOptions.where = {
      ...queryOptions.where,
      lawyer_state: options.lawyer_state,
    };
  }

  const { rows: lawyers, count: totalCount } = await Lawyer.findAndCountAll(
    queryOptions
  );

  return {
    lawyers,
    totalCount,
  };
}

export async function getUserProfile(userEmail: string) {
  const userProfile = await LawyerProfile.findOne({
    where: {
      email: userEmail,
    },
  });

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return {
    age: userProfile.age,
    phone_number: userProfile.phone_number,
    linkedin_url: userProfile.linkedin_url,
  };
}

export async function getUserLocation(userEmail: string) {
  const lawyerWithCity = (await Lawyer.findOne({
    where: { email: userEmail },
    include: [{ model: City, as: "city" }],
  })) as LawyerWithCity;

  console.log("Lawyer: ", JSON.stringify(lawyerWithCity));
  return lawyerWithCity.city?.city_name;
}

export async function updateUserLocation(userEmail: string, cityId: string) {
  const [updatedRowsCount] = await Lawyer.update(
    { last_location: cityId },
    {
      where: {
        email: userEmail,
      },
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error("User not found");
  }

  return;
}

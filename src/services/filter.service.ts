import { LAWYER_STATE } from "../enums/lawyer.enum";
import Lawyer from "../models/lawyer.model";

export async function filterLawyers(
  allLawyers: Array<Lawyer>,
  availability: string | null,
  minRating: number,
  maxRating: number
) {
  let filtered_lawyers = allLawyers;

  if (availability === "True") {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.lawyer_state === LAWYER_STATE.FREE
    );
  }
  if (minRating) {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.average_rating && lawyer.average_rating >= minRating
    );
  }
  if (maxRating) {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.average_rating && lawyer.average_rating <= maxRating
    );
  }

  return filtered_lawyers;
}

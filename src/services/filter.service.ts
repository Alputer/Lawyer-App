import { LAWYER_STATE } from "../enums/lawyer.enum";
import Lawyer from "../models/lawyer.model";

export async function filterLawyers(
  allLawyers: Array<Lawyer>,
  barId: number,
  availability: string | null,
  minRating: number,
  maxRating: number
) {
  let filtered_lawyers = allLawyers;
  if (barId) {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.bar_id === barId
    );
  }
  if (availability === "True") {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.lawyer_state === LAWYER_STATE.FREE
    );
  } else if (availability === "False") {
    filtered_lawyers = filtered_lawyers.filter(
      (lawyer) => lawyer.lawyer_state === LAWYER_STATE.BUSY
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

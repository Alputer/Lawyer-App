export const averageRatingTrigger = `CREATE OR REPLACE FUNCTION update_average_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Lawyers"
  SET average_rating = (
    SELECT AVG(rating)
    FROM "Ratings"
    WHERE rated_email = NEW.rated_email
  )
  WHERE email = NEW.rated_email;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER after_insert_rating
AFTER INSERT ON "Ratings"
FOR EACH ROW
EXECUTE FUNCTION update_average_rating();
`;

import { Bar } from "../models/bar.model";

export async function barExists(barId: string) {
  const bar = await Bar.findOne({
    _id: barId,
  });
  console.log(barId);
  console.log(bar);
  return !!bar;
}

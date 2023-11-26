export interface GetMonthWorkoutResponse {
  year: string;
  workout: string;
  _id: string;
  notes: Record<string,string>;//store them as a string array

}

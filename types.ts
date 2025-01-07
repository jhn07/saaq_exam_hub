
export type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
}

export type ColorType = "purple" | "yellow" | "blue" | "red" | "indigo" | "green";

export type State = {
  success: boolean;
  error: string | null;
}
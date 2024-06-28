export type OptionType = {
  strike_price: number | null;
  type: "Call" | "Put";
  bid: number | null;
  ask: number | null;
  long_short: "long" | "short";
  expiration_date?: string;
};

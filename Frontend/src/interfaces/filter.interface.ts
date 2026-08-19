export interface FilterOptions {
  name: string;
  options: {
    name: string;
    value: string;
    checked: boolean;
  }[];
}

export interface FilterOption {
  name: string;
  value: string;
  checked: boolean;
}

export type FilterAction =
  | { type: "TOGGLE"; groupName: string; value: string }
  | { type: "RESET_ALL" };
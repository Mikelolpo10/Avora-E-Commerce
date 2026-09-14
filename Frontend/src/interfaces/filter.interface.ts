interface PriceValue {
  min: string;
  max: string;
}

export interface FilterOption {
  name: string;
  value: string | PriceValue;
  checked: boolean;
}

export interface FilterOptions {
  name: string;
  options: FilterOption[];
}

export type FilterAction =
  | {
    type: "TOGGLE";
    groupName: string;
    value: string | object;
  }
  | {
    type: "RESET_ALL";
  };


export interface CheckedFilter {
  filter: string;
  value: string | PriceValue;
}
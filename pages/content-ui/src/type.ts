import React from "react";

export const DataView = {
  old: 'old',
  new: 'new',
  both: 'both',
};

export type DataViewType = keyof typeof DataView;

export type ControlPanelState = {
  standart_refresh: boolean;
  human_like_refresh: boolean;
  data_view: DataViewType;
  newest_to_top: boolean;
  multi_tab: boolean;
  auto_open_data: boolean;
  auto_open_tab: boolean;
  non_stop_refresh: boolean;
  change_price: [number];
  refresh_interval: [number];
  range_refresh_interval: [number, number];
};export type FieldProps<V = string> = {
  value?: V;
  onChange?: (e: any) => void;
  label: React.ReactElement | string;
  [key: string]: any;
};
export type SelectProps = FieldProps & {
  options: {
    value: string;
    label: string;
  }[];
};


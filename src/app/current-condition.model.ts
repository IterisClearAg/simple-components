export interface UnitValuePair {
  unit: string;
  value: number;
}

export interface CurrentCondition {
  id: number;
  location: string;
  air_temp: UnitValuePair;
  cloud_cover: UnitValuePair;
  descriptors: Array<Descriptor>;
  dew_point: UnitValuePair;
  ice_acc_last_hour: UnitValuePair;
  liquid_acc_last_hour: UnitValuePair;
  long_wave_radiation: UnitValuePair;
  msl_pressure: UnitValuePair;
  precip_acc_last_hour: UnitValuePair;
  relative_humidity: UnitValuePair;
  short_wave_radiation: UnitValuePair;
  snow_acc_last_hour: UnitValuePair;
  station_pressure: UnitValuePair;
  u_wind_speed: UnitValuePair;
  v_wind_speed: UnitValuePair;
  valid_time_end: number;
  valid_time_start: number;
  visibility: UnitValuePair;
  wind_direction: UnitValuePair;
  wind_speed: UnitValuePair;
}

export interface Descriptor {
  code: number;
  icon: string;
  text: string;
}

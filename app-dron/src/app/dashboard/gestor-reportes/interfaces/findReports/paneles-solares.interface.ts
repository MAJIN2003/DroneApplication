
export interface FindReportsRequest {
  fecha: string;
  time1: string;
  time2: string;
}

export interface FindReportsRequestDays {
  fecha1: string;
  fecha2: string;
}

export interface FindReportsResponse {
  data:       Datum[];
  pagination: Pagination;
}

export interface Datum {
  id:             number;
  fecha_registro: string;
  Vp:             number;
  Cp:             number;
  Vb:             number;
  Cb:             number;
  Vc:             number;
  Cc:             number;
  uav_id:         number;
}

export interface Pagination {
  count: number;
  page:  number;
  items: number;
  pages: number;
  next:  number;
  prev:  number;
}

export interface AveragedReport {
  hour: string;
  Cp: number;
  Vp: number;
  Cb: number;
  Vb: number;
  Cc: number;
  Vc: number;
}
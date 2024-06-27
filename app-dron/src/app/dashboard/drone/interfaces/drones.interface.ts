
export interface Drones {
  data:       Dron[];
  pagination: Pagination;
}

export interface Dron {
  id:                number;
  nombre:            string;
  descripcion:       string;
  numero_serie:      string;
  tipo_dron:         string;
  capacidad_bateria: number;
  tipo_placa:        string;
  max_viento_vuelo:  number;
  user_name:         string;
}

export interface Pagination {
  count: number;
  page:  number;
  items: number;
  pages: number;
  next:  null;
  prev:  null;
}


export interface DronForm {
  nombre:            string;
  descripcion:       string;
  numero_serie:      string;
  tipo_dron: string;
  capacidad_bateria: number;
  tipo_placa: string;
  max_viento_vuelo: number;
  user_id: number;
}

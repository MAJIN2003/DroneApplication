
export interface UAVResponse {
    data:       Datum[];
    pagination: Pagination;
}

export interface Datum {
    id:                 number;
    fecha_registro:     string;
    voltaje:            number;
    porcentaje_bateria: number;
    corriente:          number;
    modo_vuelo:         string;
    velocidad:          number;
    altitud:            number;
    latitud:            number;
    longitud:           number;
    uav_id:             number;
}

export interface Pagination {
    count: number;
    page:  number;
    items: number;
    pages: number;
    next?:  number;
    prev?:  number;
}

export interface EstacionCargaACResponse {
    data:       Datum[];
    pagination: Pagination;
}

export interface Datum {
    id:             number;
    fecha_registro: string;
    corrienteAC:    number;
    potenciaAC:     number;
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

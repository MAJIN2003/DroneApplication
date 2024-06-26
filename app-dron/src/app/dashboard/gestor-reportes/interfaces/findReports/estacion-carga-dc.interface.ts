export interface EstacionCargaDCResponse {
    data:       Datum[];
    pagination: Pagination;
}

export interface Datum {
    id:             number;
    fecha_registro: string;
    corrienteDC:    number;
    potenciaDC:     number;
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

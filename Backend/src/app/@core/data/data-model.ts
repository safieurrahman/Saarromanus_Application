export interface Geolocation {
    _lat: number,
    _log: number
}

export interface HistoricSites {
    name_en: string,
    name_de: string,
    name_fr: string,
    information_en: string,
    information_de: string,
    information_fr: string,
    route_path: Array<Geolocation>,
    site_type: string
}

export interface HistoricRoutes {
    name_en: string,
    name_de: string,
    name_fr: string,
    information_en: string,
    information_de: string,
    information_fr: string,
    geo_location: Geolocation,
    site_list: Array<string>,
}

export interface SiteType {
    name_en: string,
    name_de: string,
    name_fr: string,
    information_en: string,
    information_de: string,
    information_fr: string,
}
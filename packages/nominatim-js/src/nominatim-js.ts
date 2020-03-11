import * as superagent from 'superagent';

interface ICommonParams {
  format?: 'html' | 'json' | 'xml' | 'jsonv2'
  json_callback?: string
  accept_language?: string
  'accept-language'?: string
  addressdetails?: 0 | 1
  extratags?: 0 | 1
  namedetails?: 0 | 1
  email?: string
  debug?: 0 | 1
}

// from: https://wiki.openstreetmap.org/wiki/Nominatim#Parameters_2
export interface ISearchParams extends ICommonParams {
  q: string
  street?: string
  city?: string
  state?: string
  country?: string
  viewbox?: string
  postalcode?: string
  countryCodesArray?: string[]
  countrycodes?: string
  bounded?: 0 | 1,
  polygon?: 0 | 1,
  email?: string,
  exclude_place_ids?: string,
  limit?: number,
  dedupe?: 0 | 1
}

export interface IAddress {
  house_number?: string
  road?: string
  neighbourhood?: string
  suburb?: string
  postcode?: string
  city: string
  city_district?: string
  county?: string
  state: string
  country: string
  country_code: string
  continent?: string
  public_building?: string
  attraction?: string
  pedestrian?: string
  peak?: string
  bakery?: string
  electronics?: string
  construction?: string
}

export interface ISearchResult {
  place_id: string
  osm_id: string
  osm_type: PlaceTypeLabel
  boundingbox?: string[4]
  lat: string
  lng: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
  address: IAddress
  licence: string
  svg?: string
}

// For backward compatibility
export type INominatimResult = ISearchResult;

const PLACES_TYPES = {
  node: "N" as "N",
  way: "W" as "W",
  relation: "R" as "R"
};

type Places = typeof PLACES_TYPES;
type PlaceTypeLabel = keyof Places;
type PlaceTypeId = Places[PlaceTypeLabel];

export interface IOsmId {
  type: PlaceTypeLabel
  id: number
}

export interface ILookupParams extends ICommonParams {}

export class NominatimJS {
  private static NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/';

  private static normalizeParams<T extends ICommonParams>(params: T): T {
    return {
      ...params,
      format: params.format || 'json',
      "accept-language": params["accept-language"] || params.accept_language
    };
  }

  private static stringifyOsmId (osmId: IOsmId): string {
    return `${PLACES_TYPES[osmId.type]}${osmId.id}`;
  }

  public static async search(rawParams: ISearchParams): Promise<ISearchResult[]> {
    const params = NominatimJS.normalizeParams(rawParams);

    return await superagent
      .get(`${NominatimJS.NOMINATIM_ENDPOINT}search`)
      .query({
        ...params,
        countrycodes: params.countrycodes || (params.countryCodesArray ? params.countryCodesArray.join(',') : undefined)
      })
      .then((res: superagent.Response) => res.body || []);
  }

  public static async lookup(osmIds: IOsmId[], rawParams: ILookupParams): Promise<ISearchResult[]> {
    const params = NominatimJS.normalizeParams(rawParams);

    return await superagent
      .get(`${NominatimJS.NOMINATIM_ENDPOINT}lookup`)
      .query({
        ...params,
        osm_ids: osmIds.map(NominatimJS.stringifyOsmId).join(',')
      })
      .then((res: superagent.Response) => res.body || [])
  }
}

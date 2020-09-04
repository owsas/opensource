import fetch from 'cross-fetch';

interface ICommonParams {
  format?: 'html' | 'json' | 'xml' | 'jsonv2'
  json_callback?: string
  accept_language?: string
  'accept-language'?: string
  addressdetails?: 0 | 1
  extratags?: 0 | 1
  namedetails?: 0 | 1
  email?: string
  debug?: 0 | 1,
  endpoint?: string, // custom open street map endpoint
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
  dedupe?: 0 | 1,
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

  /**
   * Searches based on the given information. By default searches
   * against the Open Street Map Nominatim server. A custom endpoint
   * could be defined, using the "endpoint" parameter.
   * @param rawParams
   */
  public static async search(rawParams: ISearchParams): Promise<ISearchResult[]> {
    const params = NominatimJS.normalizeParams(rawParams);
    const countryCodes = params.countrycodes || (params.countryCodesArray ? params.countryCodesArray.join(',') : undefined);

    const url = new URL(rawParams.endpoint || `${NominatimJS.NOMINATIM_ENDPOINT}search`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    if (countryCodes) {
      url.searchParams.append('countrycodes', countryCodes);
    }

    return fetch(url.toJSON())
      .then(res => res.json());
  }

  /**
   * Looks up for an array of given Open Street Map ids
   * @param osmIds
   * @param rawParams
   */
  public static async lookup(osmIds: IOsmId[], rawParams: ILookupParams): Promise<ISearchResult[]> {
    const params = NominatimJS.normalizeParams(rawParams);

    const url = new URL(rawParams.endpoint || `${NominatimJS.NOMINATIM_ENDPOINT}lookup`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    url.searchParams.append('osm_ids', osmIds.map(NominatimJS.stringifyOsmId).join(','));

    return fetch(url.toJSON())
      .then(res => res.json());
  }
}

import { NominatimJS, ISearchParams, ILookupParams } from '../src/nominatim-js';

const search: ISearchParams = {
  q: '5th avenue',
  country: 'USA',
  accept_language: 'fr'
};

NominatimJS.search(search)
  .then(results => {
    console.log('got search results', results.map(result => {
      return result.display_name
    }));
  });

const lookupParams: ILookupParams = {
  accept_language: 'oc',
  addressdetails: 1,
  extratags: 1,
  namedetails: 1
};

NominatimJS.lookup([{ type: "way", id: 163993703 }], lookupParams)
  .then(results => {
    console.log('got lookup results', JSON.stringify(results, null, 2));
  });

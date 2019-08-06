import { NominatimJS } from '../src/nominatim-js';

describe('Getting results', () => {
  let response;

  beforeAll(async () => {
    response = await NominatimJS.search({ q: 'bakery' });
  });

  test('Should be able to fetch results', async () => {
    expect(response && response[0]).toBeTruthy();
  });

  test('Should bring the expected information', async () => {
    const result = response[0];
    expect(typeof result.place_id === 'number').toBe(true);
    expect(typeof result.osm_id === 'number').toBe(true);
    expect(typeof result.lat === 'string').toBe(true);
    expect(typeof result.lon === 'string').toBe(true);
    expect(typeof result.display_name === 'string').toBe(true);
    expect(typeof result.type === 'string').toBe(true);
    expect(typeof result.importance === 'number').toBe(true);
  });
});

import {
  getAllGenerationsInfo,
  getGenerationByAge,
  getGenerationByYear,
} from '../src/get-generation';

describe('#getGenerationByYear', () => {
  test('should get the Traditionalist type', () => {
    expect(getGenerationByYear(1920)).toBe('Traditionalist');
  });

  test('should get the Older Boomer type', () => {
    expect(getGenerationByYear(1950)).toBe('Older Boomer');
  });

  test('should get the Younger Boomer type', () => {
    expect(getGenerationByYear(1960)).toBe('Younger Boomer');
  });

  test('should get the Generation X (older) type', () => {
    expect(getGenerationByYear(1966)).toBe('Generation X (older)');
  });

  test('should get the Generation X (younger) type', () => {
    expect(getGenerationByYear(1971)).toBe('Generation X (younger)');
  });

  test('should get the Generation Y type', () => {
    expect(getGenerationByYear(1982)).toBe('Generation Y');
  });

  test('should get the Generation Z type', () => {
    expect(getGenerationByYear(1998)).toBe('Generation Z');
  });

  test('should get the Generation Alpha type', () => {
    expect(getGenerationByYear(2015)).toBe('Generation Alpha');
  });
});

describe('getGenerationByAge', () => {
  test('should get Generation Alpha for 3 years old people', () => {
    expect(getGenerationByAge(3)).toEqual('Generation Alpha');
  });

  test('should get Traditionalist for 80 years old people', () => {
    expect(getGenerationByAge(80)).toEqual('Traditionalist');
  });

  test('should get Generation Z for 20 years old people', () => {
    expect(getGenerationByAge(20)).toEqual('Generation Z');
  });
});

describe('getAllGenerationsInfo', () => {
  test('should get object array with all generations info', () => {
    const thisYear: number = new Date().getFullYear();

    const response = [{
      name: 'Traditionalist',
      range: {
        max: 1954,
        min: 0,
      },
    }, {
      name: 'Older Boomer',
      range: {
        max: 1964,
        min: 1955,
      },
    }, {
      name: 'Younger Boomer',
      range: {
        max: 1970,
        min: 1965,
      },
    }, {
      name: 'Generation X (older)',
      range: {
        max: 1980,
        min: 1971,
      },
    }, {
      name: 'Generation X (younger)',
      range: {
        max: 1980,
        min: 1971,
      },
    }, {
      name: 'Generation Y',
      range: {
        max: 1995,
        min: 1981,
      },
    }, {
      name: 'Generation Z',
      range: {
        max: 2010,
        min: 1996,
      },
    }, {
      name: 'Generation Alpha',
      range: {
        max: thisYear,
        min: 2011,
      },
    }];

    expect(getAllGenerationsInfo()).toEqual(response);
  });
});

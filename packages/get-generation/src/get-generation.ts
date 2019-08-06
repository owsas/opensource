export interface IGenerationInfo {
  name: string;
  range: {
    min: number,
    max: number,
  };
}
export function getGenerationByYear(birthYear: number): string {
  if (birthYear < 1946) {
    return 'Traditionalist';
  } else if (birthYear >= 1946 && birthYear < 1955) {
    return 'Older Boomer';
  } else if (birthYear >= 1955 && birthYear < 1965) {
    return 'Younger Boomer';
  } else if (birthYear >= 1965 && birthYear < 1971) {
    return 'Generation X (older)';
  } else if (birthYear >= 1971 && birthYear < 1981) {
    return 'Generation X (younger)';
  } else if (birthYear >= 1981 && birthYear < 1996) {
    return 'Generation Y';
  } else if (birthYear >= 1996 && birthYear < 2011) {
    return 'Generation Z';
  } else {
    return 'Generation Alpha';
  }
}

export function getGenerationByAge(age: number): string {
  const date = new Date();
  const oldYear = date.getFullYear() - age;
  return getGenerationByYear(oldYear);
}

export function getAllGenerationsInfo(): IGenerationInfo[] {
  const thisYear: number = new Date().getFullYear();
  return [{
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
}

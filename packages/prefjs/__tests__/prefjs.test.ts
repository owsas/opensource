import PrefJS from '../src/prefjs';

const data = {
  en: {
    title: 'My page',
    description: 'Test blog post',
    deep: { test: 'Deep test parameter' },
    fallbackValue: 'If other values do not exist, I will fallback here'
  },
  es: {
    title: 'Mi página',
    description: 'Post de blog de prueba',
    deep: { test: 'Parámetro de prueba' }
  },
  fr: {
    title: 'Ma page',
    description: 'Mon blog post d\'essai',
    deep: { test: 'Paramètre d\'essai' }
  }
};

let pref: PrefJS;
const defaultLocale = 'en';
let currentLocale = 'fr';

describe('prefjs', () => {
  it('Should initialize without errors', () => {
    pref = new PrefJS({ defaultLocale, currentLocale });
  });

  it('Given the global data: should accept it without errors', () => {
    pref.setGlobalData(data);
  });

  it('Having the global data: should be able to retrieve all the values', () => {
    expect(pref.get('title')).toEqual(data[currentLocale].title);
    expect(pref.get('deep.test')).toEqual(data[currentLocale].deep.test);
    expect(pref.get('fallbackValue')).toEqual(data[defaultLocale].fallbackValue);
  });

  it('After changing the current locale: should be able to retrieve all the values', () => {
    currentLocale = 'es';
    pref.setCurrentLocale(currentLocale);

    expect(pref.get('title')).toEqual(data[currentLocale].title);
    expect(pref.get('deep.test')).toEqual(data[currentLocale].deep.test);
    expect(pref.get('fallbackValue')).toEqual(data[defaultLocale].fallbackValue);
  });

  it('Given an unexisting path: should return the fallbackValue', () => {
    const fallbackValue = 'This does not exist';
    const actual = pref.get('this.path.does.not.exist', fallbackValue);
    expect(actual).toEqual(fallbackValue);
  });
});

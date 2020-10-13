import PrefJS from '../src/prefjs';

const data = {
  en: {
    title: 'My page',
    description: 'Test blog post',
    deep: { test: 'Deep test parameter' },
    formatted: 'Use %s to format my %d strings',
    formatted2: 'Use %s to format my %d strings, %s I have another string with %s more characters to %s',
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

  it('Given a path to a formatted string: it should replace it', () => {
    pref.setCurrentLocale('es');
    const actual = pref.getF('formatted', 'Fallback', 'this', 10);
    const expected = 'Use this to format my 10 strings';
    expect(actual).toEqual(expected);
  });

  it('Given a not existent path to a formatted string and a fallback: it should replace it', () => {
    pref.setCurrentLocale('es');
    const actual = pref.getF('not.existent.formatted', 'I use %s %d times a day', 'this', 10);
    const expected = 'I use this 10 times a day';
    expect(actual).toEqual(expected);
  });

  it('Given a path to a more complex formatted string: it should replace it', () => {
    pref.setCurrentLocale('es');
    const actual = pref.getF('formatted2', 'Fallback', 'this', '10', 'here', 'way', 'format');
    const expected = 'Use this to format my 10 strings, here I have another string with way more characters to format';
    expect(actual).toEqual(expected);
  });

  describe('#getFromObject', () => {
    test.each([
      // Different locale as default
      ['en', 'es', { text: 'Hello', text_es: 'Hola' }, 'text', 'Hola'],
      ['fr', 'en', { message: 'Bonjour', message_en: 'Hello' }, 'message', 'Hello'],
      ['fr', 'en', { message: 123, message_en: 456 }, 'message', 456], // not only strings
      ['fr', 'en', { show: true, show_en: false }, 'show', false], // not only strings
      ['pt', 'es', { show: { ok: true }, show_es: { ok: false } }, 'show',  { ok: false }], // objects

      // Same locale as default
      ['fr', 'fr', { message: 'Bonjour', message_en: 'Hello' }, 'message', 'Bonjour'],
      ['es', 'es', { message: 123, message_en: 456 }, 'message', 123], // not only strings
      ['en', 'en', { show: true, show_en: false }, 'show', false], // overriden value
      ['en', 'en', { show: true, show_es: false }, 'show', true], // overriden
      ['pt', 'pt', { show: { ok: true }, show_en: { ok: false } }, 'show',  { ok: true }], // objects
    ])(
      'Using default locale %p and current locale %p, if given %p and the key %p, returns %p',
      (defaultLocale, currentLocale, obj, key, expected) => {
        const instance = new PrefJS({ defaultLocale, currentLocale });
        expect(instance.getFromObject(obj, key)).toEqual(expected);
      }
    );
  });
});

import { get } from 'dot-prop';
import * as printj from 'printj';

export default class PrefJS {
  private defaultLocale = 'en';
  private currentLocale: string = this.defaultLocale;
  private data = {};

  constructor(params?: { defaultLocale: string, currentLocale?: string }) {
    if (params?.defaultLocale) {
      this.defaultLocale = params.defaultLocale;

      if (params.currentLocale) {
        this.currentLocale = params.currentLocale;
      }
    }
  }

  /**
   * Sets the default locale
   * @param locale
   * @example
   * setDefaultLocale('es');
   */
  setDefaultLocale(locale: string): PrefJS {
    this.defaultLocale = locale;
    return this;
  }

  /**
   * Set the current locale
   * @param locale
   */
  setCurrentLocale(locale: string): PrefJS {
    this.currentLocale = locale;
    return this;
  }

  /**
   * Sets the data for the entire configuration
   * @param data Example: { 'en': { ...an object with properties in english }, 'es': { ...the same object with properties in spanish }}
   * @example
   * setGlobalData({
   *  en: { title: 'My home', description: 'It is my home.' },
   *  es: { title: 'Mi casa', description: 'Es mi casa.' },
   *  fr: { title: 'Ma maison', description: 'C\'est ma maison' }
   * });
   */
  setGlobalData(data: { [key:string]: any }): PrefJS {
    this.data = data;
    return this;
  }

  /**
   * Sets the data for the given locale
   * @param locale
   * @param data
   * @example
   * setData('es', {
   *  pageTitle: 'Érase una vez en Hollywood',
   *  director: 'Quentin Tarantino'
   * });
   */
  setLocaleData(locale: string, data: any): PrefJS {
    this.data[locale] = data;
    return this;
  }

  /**
   * Gets all the data stored for a single locale
   * @param locale
   */
  getLocaleData(locale: string): any {
    return this.data[locale];
  }

  /**
   * Returns all the locales configured
   * @example
   * getLocalesConfigured(); // ['en', 'es', 'pt']
   */
  getLocalesConfigured(): string[] {
    return Object.keys(this.data);
  }

  /**
   * Gets a value from the loaded data, falling back to the
   * value from the locale and or to the fallbackValue given
   * @param path
   * @param fallbackValue
   */
  get(path: string, fallbackValue?: string) {
    // Get from the desired locale first
    let value: any = get(this.data[this.currentLocale], path);

    // If the value is undefined, try to get the value
    // from the default locale
    if (typeof value === 'undefined') {
      value = get(this.data[this.defaultLocale], path, fallbackValue);
    }

    return value;
  }

  /**
   * Gets a value from the loaded data, and uses
   * `printj` to format it.
   * @param path
   * @param fallbackValue
   * @param params All the items to format in the string
   */
  getF(path: string, fallbackValue?: string, ...params: any[]): string {
    // Get the string using the last parameter as the fallback value
    const str = this.get(path, fallbackValue);
    return printj.sprintf(str, ...params);
  }
}

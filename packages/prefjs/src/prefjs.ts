import { get } from 'dot-prop';
import * as printj from 'printj';

export default class PrefJS {
  private defaultLocale = 'en';
  private currentLocale: string = this.defaultLocale;
  private parentLocale: string = null;
  private data: { [k: string]: { [j: string]: any } } = {};

  constructor(params?: { defaultLocale: string, currentLocale?: string }) {
    if (params?.defaultLocale) {
      this.defaultLocale = params.defaultLocale;

      if (params.currentLocale) {
        this.currentLocale = params.currentLocale;
      }
    }

    this.updateParentLocale();
  }

  /**
   * Updates the parent locale
   */
  updateParentLocale() {
    // Test if the language is something like en_US
    const localeParts: string[] = this.currentLocale.split('_');
    if (localeParts.length > 1) {
      this.parentLocale = localeParts[0]; // en
    } else {
      this.parentLocale = null;
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
    this.updateParentLocale();
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
   * Tells if the current instance's data
   * has the given locale
   * @param locale
   */
  hasLocale(locale: string): boolean {
    return !!this.data[locale];
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
   * Returns the current locale
   * @example
   * getCurrentLocale()
   * // 'es'
   */
  getCurrentLocale(): string {
    return this.currentLocale;
  }

  /**
   * @returns The parent locale of the current locale
   */
  getParentLocale(): string | null {
    return this.parentLocale;
  }

  /**
   * Returns the default locale
   * @example
   * getDefaultLocale()
   * // 'en'
   */
  getDefaultLocale(): string {
    return this.defaultLocale;
  }

  /**
   * Returns the configured data
   * @example
   * getConfiguredData()
   * // { es: { title: 'Hola' }, en: { title: 'Hello' } }
   */
  getConfiguredData() {
    return this.data;
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
      // Try to get from the parent locale
      if (this.parentLocale && this.hasLocale(this.parentLocale)) {
        value = get(this.data[this.parentLocale], path);
      }

      // Try to get from the default locale
      if (typeof value === 'undefined') {
        value = get(this.data[this.defaultLocale], path, fallbackValue);
      }
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

  /**
   * Processes an object with lang keys added
   * @param obj
   * @example
   * Input: { text: 'Prueba', text_en: 'Test' }
   */
  getFromObject(obj: any, key: string, params: {
    customLocale?: string;
    fallbackValue?: string;
  } = {}): any {
    const value = obj[`${key}_${params.customLocale || this.currentLocale}`];

    if (typeof value !== 'undefined') {
      return value;
    }

    if (typeof params.fallbackValue !== 'undefined') {
      return params.fallbackValue;
    }

    return obj[key];
  }
}

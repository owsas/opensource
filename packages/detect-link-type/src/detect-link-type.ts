
import * as parseurl from 'parseurl';

export class Detector {

  /**
   * @param {string} link
   */
  public static isTTF(link): boolean {
    return Detector.getExtension(link) === 'ttf';
  }

  /**
   * @param {string} link
   */
  public static isCSS(link): boolean {
    return Detector.getExtension(link) === 'css';
  }

  /**
   * @param {string} link
   */
  public static isHTML(link): boolean {
    return Detector.getExtension(link) === 'html';
  }

  /** 
   * @param {string} link
   */
  public static isJPG(link): boolean {
    const extension = Detector.getExtension(link);
    return (extension === 'jpg') || (extension === 'jpeg');
  }

  /**
   * @param {string} link
   */
  public static isGIF(link): boolean {
    return Detector.getExtension(link) === 'gif';
  }

  /**
   * @param {string} link
   */
  public static isPNG(link): boolean {
    return Detector.getExtension(link) === 'png';
  }

  /**
   * @param {string} link
   */
  public static isImage(link): boolean {
    return Detector.isPNG(link)
      || Detector.isJPG(link)
      || Detector.isGIF(link);
  }

  /**
   * @param {string} link
   */
  public static isJS(link): boolean {
    return Detector.getExtension(link) === 'js';
  }

  /**
   * @param {string} link
   */
  public static isPDF(link): boolean {
    return Detector.getExtension(link) === 'pdf';
  }

  /**
   * Gets the extension of a link
   * @param {string} link
   */
  public static getExtension(link): string {
    if (typeof link !== 'string') {
      throw new Error('link must be a string');
    }

    const parsed = parseurl({ url: link });
    const realLink = parsed.hostname ? parsed.pathname : link;

    const lastChars = realLink.substr(realLink.length - 5, 5);
    const type = lastChars.split('.')[1];
    if (!type) {
      return null;
    }

    return type.toLowerCase();
  }
}

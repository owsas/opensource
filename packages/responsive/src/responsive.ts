export interface IBreakPoints {
  xs: number;
  sm: number;
  md: number;
}
export class Responsive {
  // From https://stackoverflow.com/questions/19592968/bootstrap-3-breakpoints-and-media-queries
  public static breakpoints: IBreakPoints = {
    md: 992,
    sm: 768,
    xs: 576,
  };

  /**
   * Use your custom breakpoints
   * @param breakpoints
   */
  public static setBreakpoints(breakpoints: IBreakPoints) {
    Responsive.breakpoints = breakpoints;
  }

  /**
   * Is device an extra small screen?
   * @param width
   */
  public static isXs(width?: number): boolean {
    const w = width || window.innerWidth;
    return w <= Responsive.breakpoints.xs;
  }

  /**
   * Is device a small screen?
   * @param width
   */
  public static isSm(width?: number): boolean {
    const w = width || window.innerWidth;
    return !Responsive.isXs(w) && w <= Responsive.breakpoints.sm;
  }

  /**
   * Is device a medium screen?
   * @param width
   */
  public static isMd(width?: number): boolean {
    const w = width || window.innerWidth;
    return !Responsive.isXs(w) && !Responsive.isSm(w) && w <= Responsive.breakpoints.md;
  }

  /**
   * Is device a large screen?
   * @param width
   */
  public static isLg(width?: number): boolean {
    const w = width || window.innerWidth;
    return w > Responsive.breakpoints.md;
  }

  /**
   * Is device an extra small or a small screen?
   * @param width
   */
  public static isMobile(width?: number): boolean {
    return Responsive.isXs(width) || Responsive.isSm(width);
  }

  /**
   * Is device a medium or large screen?
   * @param width
   */
  public static isDesktop(width?: number): boolean {
    return Responsive.isMd(width) || Responsive.isLg(width);
  }
}

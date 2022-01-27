export interface CssStats {
  /**
   * The url the styles originate from
   */
  origin: string;

  /**
   * Color codes
   */
  colors: Array<Record<string, string>>;

  /**
   * Fonts
   */
  font_families: Array<Record<string, string>>;
}

export interface CssStats {
  /**
   * The url the styles originate from
   */
  origin: string;

  /**
   * Color codes
   */
  colors: Array<Record<string, unknown>>;

  /**
   * Fonts
   */
  font_families: Array<Record<string, unknown>>;
}

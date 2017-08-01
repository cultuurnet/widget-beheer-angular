/**
 * Interface for classes that represent a widget page template.
 */
export interface PageTemplate {
  /**
   * The page template title.
   * Used as default title when creating a new page from a template.
   */
  title: string;

  /**
   * The page template label
   */
  label: string;

  /**
   * The page template description
   */
  description: string;

  /**
   * Template configuration object
   */
  configuration: object;
}

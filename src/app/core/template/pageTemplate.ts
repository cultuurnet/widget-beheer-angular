/**
 * Interface for classes that represent a widget page template.
 */
export interface PageTemplate {
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
  configuration: Record<string, unknown>;

  /**
   * Indicates if this template has a preview available
   */
  preview: boolean;
}

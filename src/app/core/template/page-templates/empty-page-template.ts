import { PageTemplate } from "../pageTemplate";

/**
 * Empty page template
 */
export class EmptyPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label: string = 'Leeg';

  /**
   * The template description
   */
  public description: string = 'Je begint met een lege lay-out en bouwt zo alles op je eigen maat.';

  /**
   * Preview available
   */
  public preview = false;

  /**
   * The template configuration
   */
  public configuration = {
    'title': 'Mijn pagina',
    'rows': [
    ],
    'styling': {}
  };

}

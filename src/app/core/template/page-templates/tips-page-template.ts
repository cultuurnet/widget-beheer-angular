import { PageTemplate } from "../pageTemplate";

/**
 * Tips page template
 */
export class TipsPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label: string = 'Tips';

  /**
   * The template description
   */
  public description: string = 'Je plaatst enkele evenementen in de kijker en gidst zo de surfer door de agenda.';

  /**
   * The template configuration
   */
  public configuration = {
    'title': 'Mijn tipspagina',
    'rows': [
      {
        'type': 'one-col',
        'regions': {
          'content': {
            'widgets': [
              {
                'type': 'tips'
              }
            ]
          }
        }
      }
    ],
    'styling': {}
  };

}

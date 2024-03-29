import { Widget } from '../widget';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';

/**
 * Provide an abstract widget.
 */
export abstract class AbstractWidget implements Widget {
  /**
   * @inheritDoc
   */
  public id: string;

  /**
   * @inheritDoc
   */
  public type: string;

  /**
   * @inheritDoc
   */
  public name: string;

  /**
   * @inheritDoc
   */
  public settings: any;

  /**
   * AbstractWidget constructor.
   * @param values
   */
  constructor(values: any = {}) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }

    // Generate a UUID if none is given
    if (!_.get(this, 'id', false)) {
      this.id = UUID.UUID();
    }
  }
}

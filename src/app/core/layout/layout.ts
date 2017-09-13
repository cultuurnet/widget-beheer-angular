import { Region } from './region';

export abstract class Layout {
  type: string;
  regions: Array<Region>;

  /**
   * Layout constructor.
   * @param type
   */
  constructor(type: string) {
    this.type = type;
  }
}

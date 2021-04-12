import { Region } from './region';

export abstract class Layout {
  type: string;
  regions: Record<string, Region>;

  /**
   * Layout constructor.
   * @param type
   */
  constructor(type: string) {
    this.type = type;
  }
}

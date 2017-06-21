import { Widget } from "../widget/widget";
import { Region } from "./region";

export class Layout {
  type: string;
  regions: Array<Region>;

  /**
   * Layout constructor.
   * @param type
   * @param regions
   */
  constructor(type: string, regions: any = {}) {
    this.type = type;
    this.regions = regions;
  }

  /**
   * Add a region to the layout.
   * @param region
   * @param widgets
   */
  addRegion(region: string, widgets: Array<Widget> = []) {
    if (!this.regions.hasOwnProperty(region)) {
      this.regions[region] = new Region(widgets);
    }

    return <Region>this.regions[region];
  }

  /**
   * Get a region.
   * @param region
   */
  getRegion(region: string) {
    if (this.regions.hasOwnProperty(region)) {
      return <Region>this.regions[region];
    }

    return false;
  }
}

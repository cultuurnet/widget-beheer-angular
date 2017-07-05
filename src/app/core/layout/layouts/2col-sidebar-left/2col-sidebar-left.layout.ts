import { Layout } from "../../layout";
import { Region } from "../../region";

/**
 * Provides a 2 col sidebar left layout.
 */
export class TwoColSidebarLeftLayout extends Layout {

  type: string;
  regions: any = {
    content: new Region(),
    sidebar_left: new Region(),
  };

}

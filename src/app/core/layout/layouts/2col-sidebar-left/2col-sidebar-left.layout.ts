import { Layout } from "../../layout";
import { Region } from "../../region";
import { TwoColSidebarLeftLayoutComponent } from "app/widget-builder/components/layouts/2col-sidebar-left/2col-sidebar-left-layout.component";

/**
 * Provide a 2 col sidebar left layout.
 */
export class TwoColSidebarLeftLayout implements Layout {

  regions: any = {
    content: new Region(),
    sidebar_left: new Region(),
  };

  component: any = TwoColSidebarLeftLayoutComponent;

}

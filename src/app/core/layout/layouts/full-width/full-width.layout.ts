import { Layout } from "../../layout";
import { Region } from "../../region";
import { FullWidthLayoutComponent } from "../../../../widget-builder/components/layouts/full-width/full-width-layout.component";

/**
 * Provide a full width layout.
 */
export class FullWidthLayout implements Layout {

  regions: any = {
    content: new Region(),
  };

  component: any = FullWidthLayoutComponent;

}

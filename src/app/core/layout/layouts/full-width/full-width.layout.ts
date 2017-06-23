import { Layout } from "../../layout";
import { Region } from "../../region";

/**
 * Provide a full width layout.
 */
export class FullWidthLayout extends Layout {

  type: string;
  regions: any = {
    content: new Region(),
  };

}

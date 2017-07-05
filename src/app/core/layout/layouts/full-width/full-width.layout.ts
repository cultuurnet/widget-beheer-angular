import { Layout } from "../../layout";
import { Region } from "../../region";

/**
 * Provides a full width layout.
 */
export class FullWidthLayout extends Layout {

  type: string;
  regions: any = {
    content: new Region(),
  };

}

import { Layout } from "../../layout";
import { Region } from "../../region";

/**
 * Provides a one col layout.
 */
export class OneCollLayout extends Layout {

  type: string;
  regions: any = {
    content: new Region(),
  };

}

import { Layout } from '../../layout';
import { Region } from '../../region';

/**
 * Provides a 2 col sidebar right layout.
 */
export class TwoColSidebarRightayout extends Layout {
  type: string;
  regions: any = {
    content: new Region(),
    sidebar_right: new Region(),
  };
}

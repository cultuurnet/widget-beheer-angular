import { Layout } from '../../layout';
import { Region } from '../../region';

/**
 * Provides a 3 col double sidebar layout.
 */
export class ThreeColDoubleSidebarLayout extends Layout {
  type: string;
  regions: any = {
    content: new Region(),
    sidebar_left: new Region(),
    sidebar_right: new Region(),
  };
}

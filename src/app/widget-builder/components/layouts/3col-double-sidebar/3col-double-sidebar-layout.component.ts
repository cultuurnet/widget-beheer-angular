import { Component } from '@angular/core';
import { AbstractLayoutDirective } from '../../../../core/layout/components/abstract-layout.component';

/**
 * Provides a 3 col with double sidebar layout component.
 */
@Component({
  'selector': 'app-3-col-double-sidebar-layout',
  'templateUrl': './3col-double-sidebar.component.html'
})
export class ThreeColDoubleSidebarLayoutComponent extends AbstractLayoutDirective {
}

import { Component } from '@angular/core';
import { AbstractLayoutDirective } from '../../../../core/layout/components/abstract-layout.component';

/**
 * Provides a two col with sidebar right layout component.
 */
@Component({
  'selector': 'app-2-col-sidebar-right-layout',
  'template': './2col-sidebar-right.component.html'
})
export class TwoColSidebarRightLayoutComponent extends AbstractLayoutDirective {
}

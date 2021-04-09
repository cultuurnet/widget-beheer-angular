import { Component } from '@angular/core';
import { AbstractLayoutDirective } from '../../../../core/layout/components/abstract-layout.component';

/**
 * Provides a two col with sidebar left layout component.
 */
@Component({
  'selector': 'app-2-col-sidebar-left-layout',
  'template': './2col-sidebar-left.component.html'
})
export class TwoColSidebarLeftLayoutComponent extends AbstractLayoutDirective {
}

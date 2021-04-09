import { Component } from '@angular/core';
import { AbstractLayoutDirective } from '../../../../core/layout/components/abstract-layout.component';

/**
 * Provides a one col layout component.
 */
@Component({
  'selector': 'app-one-col-layout',
  'template': './one-col.component.html'
})
export class OneColLayoutComponent extends AbstractLayoutDirective {
}

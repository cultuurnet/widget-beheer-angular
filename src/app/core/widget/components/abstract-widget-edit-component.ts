import { Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

/**
 * Abstract implementation of a widget edit component
 */
export abstract class AbstractWidgetEditComponent implements OnInit, OnDestroy {

  /**
   * The widget edit form
   */
  public widgetEditForm: FormGroup;

  /**
   * The widget edit component settings
   */
  @Input() settings: any;

  /**
   * Subscription to the widget edit form values
   */
  private formSubscription: Subscription;

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
      this.settings = values;

      console.log(values);
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

}
import { Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

/**
 * Abstract implementation of a widget edit component
 */
export class AbstractWidgetEditComponent implements OnInit, OnDestroy {

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
   * AbstractWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
      // Remove all null values from the form values
      // @todo: Decide if the cleanup of the empty/null values should be done here or server-side
      this.deleteEmptyProperties(values, true);

      // Apply the values to the model
      this.applyValuesToModel(values);
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Build the initial form
   */
  protected buildForm() {
    // Initialize the form
    this.widgetEditForm = this.formBuilder.group({});
  }

  /**
   * Apply the values from the form to the input model
   * @param values
   */
  protected applyValuesToModel(values: any) {
    // As a default, all top-level properties are applied to the model
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        this.settings[key] = values[key];
      }
    }
  }

  /**
   * Delete all null (or undefined) or empty properties from an object.
   * Set 'recursive' to true if you also want to delete properties in nested objects.
   */
  private deleteEmptyProperties(obj, resursive = false) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === '') {
          delete obj[key];
        } else if (resursive && typeof obj[key] === 'object') {
          this.deleteEmptyProperties(obj[key], resursive);
        }
      }
    }
  }

  /**
   * Change a checkbox value (true/false) back to its original string value
   * @param $event
   */
  public onCheckboxChange($event) {
    //We want to get back what the name of the checkbox represents, so I'm intercepting the event and
    //manually changing the value from true to the name of what is being checked.

    //check if the value is true first, if it is then change it to the name of the value
    //this way when it's set to false it will skip over this and make it false, thus un-checking
    //the box
    if(this.widgetEditForm.get($event.target.id).value) {
      this.widgetEditForm.patchValue({[$event.target.id] : $event.target.id});
    }
  }

}
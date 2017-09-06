import { FormBuilder } from '@angular/forms';
import { AbstractWidgetEditComponent } from "../../../core/widget/components/abstract-widget-edit-component";
import { WidgetBuilderService } from "../../services/widget-builder.service";

/**
 * Base widget edit component.
 */
export class BaseWidgetEditComponent extends AbstractWidgetEditComponent {

  /**
   * BaseWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService) {
    super(formBuilder);
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // Create a reference to the widget settings
    this.settings = this.widget.settings;

    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
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
   * @inheritDoc
   */
  public handleWidgetNameChanged(name: string) {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * Handle changes in the group filters
   */
  public handleGroupFiltersChanged() {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

}

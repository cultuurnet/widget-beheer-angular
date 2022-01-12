# Adding new widget types

In the application widget builder, users can choose from a variety of widget types to build a page. Each of these widget types is comprised out of the following elements:

- A widget class
- A widget edit component
- An icon

These elements are tied together by registering the widget in the widgetTypeRegistry.

## Widget class

The widget class must at least implement the `Widget` (core/widget/widgets/widget.ts) interface. If no custom implementation of the widget is needed, extending the abstract `AbstractWidget` class is the easy way to go forward.

## Widget edit component

Every widget needs an edit form component. This can be easily done by creating an new Angular component in the `widget-builder/components/widgets` directory and extending the `AbstractWidgetEditDirective` component class.
This component should provide the form via the Angular form builder in the buildForm method. By overriding the applyValuesToModel method, you gain control over how the form changes are applied back to the (widget) model.

## Icon

An icon should be placed in the `assets/widgets` folder and named in the following pattern: [widget-type]-widget.svg`

## Registering the widget

All the above elements are tied together in the application by registering the new widget type in the `WidgetTypeRegistry` in the AppModule constructor.

When registering the widget type, provide the following parameters:

- type
- label
- widget class
- widget edit component

`widgetTypeRegistry.register('search-form', 'Search form', SearchFormWidget, SearchFormWidgetEditComponent);`

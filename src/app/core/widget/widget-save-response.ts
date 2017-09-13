/**
 * Defines a widget save response
 */
export interface WidgetSaveResponse {
    /**
     * The widgetpage json
     */
    widgetPage: any;

    /**
     * The rendered preview of the requested widget
     */
    preview: string;
}

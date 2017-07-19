
import { BaseRequestOptions } from "@angular/http";

/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
export class ApiRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.withCredentials = true;
    }
}
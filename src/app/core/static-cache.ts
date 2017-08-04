import { Injectable } from "@angular/core";
import * as _ from "lodash";

/**
 * Simple static cache
 */
@Injectable()
export class StaticCache {

  /**
   * The static cache
   */
  private cache: any = {};

  /**
   * Returns a cached response, if any, or null if not present.
   * @param bin
   * @param path
   * @param defaultValue
   */
  public get(bin: string, path: Array<string>, defaultValue: any = null): any {
    // Prepend the cache bin to the path
    path.unshift(bin);

    // Always return a clone of the object so the original reference is destroyed
    return _.cloneDeep(_.get(this.cache, path, defaultValue));
  }

  /**
   * Adds or updates the response in the cache.
   * @param bin
   * @param path
   * @param value
   */
  public put(bin: string, path: Array<string>, value: any): void {
    // Prepend the cache bin to the path
    path.unshift(bin);

    _.set(this.cache, path, value);
  }

  /**
   * Clear the cache or a specific cache bin
   * @param bin
   * @param path
   */
  public clear(bin: string = null, path: Array<string> = null) {
    if (bin) {
      // Clear the path in a bin
      if (path) {
        path.unshift(bin);
        _.set(this.cache, path, {});
      }else {
        // Clear the bin
        _.set(this.cache, bin, {});
      }
    } else {
      // Clear the entire static cache
      this.cache = {};
    }

    console.log(this.cache);
  }

}

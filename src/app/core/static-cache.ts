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
   * @param key
   * @param defaultValue
   */
  public get(bin: string, key: Array<string>, defaultValue: any = null): any {
    // Prepend the cache bin to the path
    key.unshift(bin);

    // Always return a clone of the object so the original reference is destroyed
    return _.cloneDeep(_.get(this.cache, key, defaultValue));
  }

  /**
   * Adds or updates the response in the cache.
   * @param bin
   * @param key
   * @param value
   */
  public put(bin: string, key: Array<string>, value: any): void {
    // Prepend the cache bin to the path
    key.unshift(bin);

    _.set(this.cache, key, value);
  }

  /**
   * Clear the cache or a specific cache bin
   * @param bin
   */
  public clear(bin: string = null) {
    if (bin) {
      _.set(this.cache, bin, {});
    } else {
      this.cache = {};
    }
  }

}

import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { StaticCache } from "../../static-cache";

/**
 * Service that handles request to the "project" api
 */
@Injectable()
export class ProjectService {

  /**
   * ProjectService constructor.
   * @param http
   * @param cache
   */
  constructor (private http: HttpClient, private cache: StaticCache) {
  }

  /**
   * Get a project
   * @param id
   * @return {Observable<Object>}
   */
  public getProject(id: string) {
    const project = this.cache.get('project', [id], false);

    if (project) {
      return Observable.of(project);
    }

    return this.http.get(environment.apiUrl + 'project/' + id)
      .do(project => {
        // Cache the response
        this.cache.put('project', [id], project);
      });
  }

}

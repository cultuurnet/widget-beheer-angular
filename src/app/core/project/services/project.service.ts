import { Injectable } from '@angular/core';
import {of as observableOf, Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project } from '../project';
import { MemoryCache } from '../../memory-cache';

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
  constructor (private http: HttpClient, private cache: MemoryCache) {
  }

  /**
   * Get a project
   * @param id
   * @return {Observable<Object>}
   */
  public getProject(id: string) {
    const cachedProject = this.cache.get('project', [id], false);

    if (cachedProject) {
      return observableOf(cachedProject);
    }

    return this.http.get(environment.apiUrl + 'project/' + id).pipe(
      map(project => new Project(project)),
      tap(project => {
        // Cache the response
        this.cache.put('project', [id], project);
      }),);
  }

}

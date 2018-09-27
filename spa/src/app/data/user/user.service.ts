/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data Access Object for hitting user-related API end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// App dependencies
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Download Redwood token
     *
     * @returns {Observable<void>}
     */
    public downloadRedwoodToken(): Observable<boolean> {

        window.location.href = `/api/user/redwood-token`;
        // return this.get(`/api/user/redwood-token`);
        return Observable.of(true);
    }

    /**
     * Sync Session
     *
     * @returns {Observable<User>}
     */
    public syncSession(): Observable<User> {

        return this.httpClient.get<User>(`/me`);
    }
}

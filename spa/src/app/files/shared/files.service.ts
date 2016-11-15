import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { ACTIONS } from "./../../shared";
import { FilesDAO } from "./files.dao";
import { State } from "../reducer/index";
import { ICGCQuery } from "../file-filters/icgc-query";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO,
                private store: Store<State>) {}

    /**
     * Send Both Requests
     *
     * @param filter
     */
    fetchFileData(filter: Object = {}): void {
        this.fetchFileSummary(filter);
        this.fetchFileFacets(filter);
    }

    /**
     * Fetch File Summary
     *
     * @param filter
     */
    fetchFileSummary(filter: Object = {}): void {

        this.fetchFileSummaryObs(filter)
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }

    /**
     * Fetch File Facets
     *
     * @param filter
     */
    fetchFileFacets(filter: Object = {}): void {

        this.fetchFileFacetsObs(filter)
            .subscribe(((action) => {
                this.store.dispatch(action);
            }));
    }

    /**
     * Fetch File Manifest Summary
     *
     * @param filter
     */
    fetchFileManifestSummary(filter: ICGCQuery): void {

        this.fetchFileManifestSummaryObs(filter)
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }

    /**
     * Download File Manifest
     *
     * @param query
     * @returns {any}
     */
    downloadFileManifest(query: ICGCQuery): Observable<Action> {

        query.format = "tarball";

        return this.fileDAO.downloadFileManifest(query)
            .map(() => {
                return {
                    type: ACTIONS.RECEIVE_DOWNLOAD_FILE_MANIFEST
                };
            });
    }

    /**
     * Fet FileFacets Observable
     *
     * @param filter
     * @returns {Observable<Action>}
     */
    fetchFileFacetsObs(filter = {}): Observable<Action> {
        return this.fileDAO
            .fetchFileFacets(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_FILE_FACETS,
                    payload: response
                };
            });
    }

    /**
     * Fetch File Summary Observable
     *
     * @param filter
     * @returns {Observable<Action>}
     */
    fetchFileSummaryObs(filter = {}): Observable<Action> {
        return this.fileDAO
            .fetchFileSummary(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_FILE_SUMMARY,
                    payload: response
                };
            });
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param query
     * @returns {Observable<Action>}
     */
    fetchFileManifestSummaryObs(query: ICGCQuery): Observable<Action> {

        const filters = JSON.parse(query.filters);
        let repoNames = []; // TODO empty array default throws an error. There needs to be something in the repoNames

        if (filters.file && filters.file.repoName) {
            repoNames = filters.file.repoName.is;
        }

        // convert query from string back to object for post
        const form = Object.assign({}, {
            query: {
                filters: JSON.parse(query.filters)
            },
            repoNames: repoNames
        });

        return this.fileDAO
            .fetchFileManifestSummary(form)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_FILE_MANIFEST_SUMMARY,
                    payload: response
                };
            });
    }
}

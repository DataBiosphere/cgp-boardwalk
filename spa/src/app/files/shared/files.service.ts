import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FilesDAO } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";
import { TableModel } from "../table/table.model";
import { TableParamsModel } from "../table/table-params.model";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO) {}

    /**
     * Download File Manifest
     *
     * @param selectedFacets
     * @returns {any}
     */
    public downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        return this.fileDAO.downloadFileManifest(selectedFacets);
    }

    public exportToFireCloud(selectedFacets: FileFacet[]): Observable<boolean> {

        return this.fileDAO.exportToFireCloud(selectedFacets);
    }

    /**
     * Fetch File Facets
     *
     * @param selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    public fetchOrderedFileFacets(selectedFacetsByName: Map<string, FileFacet>): Observable<FileFacet[]> {

        return this.fileDAO.fetchOrderedFileFacets(selectedFacetsByName);
    }

    /**
     * Fetch the table data
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {TableParamsModel} tableParams
     * @returns {Observable<TableModel>}
     */
    public fetchFileTableData(selectedFacetsByName: Map<string, FileFacet>, tableParams: TableParamsModel): Observable<TableModel> {

        return this.fileDAO.fetchFileTableData(selectedFacetsByName, tableParams);
    }

    /**
     * Fetch File Summary Observable
     *
     * @param selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(selectedFacets: FileFacet[]): Observable<FileSummary> {

        return this.fileDAO.fetchFileSummary(selectedFacets);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileDAO.fetchFileManifestSummary(selectedFacets);
    }

}

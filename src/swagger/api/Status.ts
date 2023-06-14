/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ResponseStatus } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Status<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * @description Get service status
     *
     * @tags Services
     * @name Status
     * @summary GET the status of the service
     * @request GET:/status
     */
    status = (params: RequestParams = {}) =>
        this.request<ResponseStatus, ResponseStatus>({
            path: `/status`,
            method: "GET",
            format: "json",
            ...params,
        });
}

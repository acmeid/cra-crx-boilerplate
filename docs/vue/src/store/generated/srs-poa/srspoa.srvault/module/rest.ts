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

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export interface SrvaultFixedDeposit {
  /** @format uint64 */
  id?: string;
  account?: string;
  denom?: string;
  amount?: string;
  interest?: string;

  /** @format int64 */
  start_height?: string;

  /** @format int64 */
  end_height?: string;
  period?: SrvaultFixedDepositPeriod;
}

export enum SrvaultFixedDepositPeriod {
  PERIOD1MONTHS = "PERIOD_1_MONTHS",
  PERIOD3MONTHS = "PERIOD_3_MONTHS",
  PERIOD6MONTHS = "PERIOD_6_MONTHS",
  PERIOD12MONTHS = "PERIOD_12_MONTHS",
  PERIOD24MONTHS = "PERIOD_24_MONTHS",
  PERIOD48MONTHS = "PERIOD_48_MONTHS",
}

export enum SrvaultFixedDepositQueryType {
  QUERY_ALL = "QUERY_ALL",
  QUERY_NOT_EXPIRED = "QUERY_NOT_EXPIRED",
  QUERY_EXPIRED = "QUERY_EXPIRED",
}

export enum SrvaultKYCROLE {
  KYC_ROLE_USER = "KYC_ROLE_USER",
  KYC_ROLE_ADMIN = "KYC_ROLE_ADMIN",
}

export interface SrvaultKyc {
  account?: string;
  regionId?: string;

  /** @format int64 */
  LastClearHeight?: string;
  role?: SrvaultKYCROLE;
  minStaking?: string;
  maxStaking?: string;
}

export interface SrvaultMsgAgToAcResponse {
  retcode?: string;
}

export interface SrvaultMsgDoFixedDepositResponse {
  /** @format uint64 */
  id?: string;
}

export interface SrvaultMsgDoFixedWithdrawResponse {
  retcode?: string;
}

export interface SrvaultMsgNewKycResponse {
  retcode?: string;
}

export interface SrvaultMsgRemoveKycResponse {
  retcode?: string;
}

export interface SrvaultMsgSetFixedDepositInterestRateResponse {
  retcode?: string;
}

export interface SrvaultMsgSetKycMaxStakingResponse {
  retcode?: string;
}

export interface SrvaultMsgSetRegionFeeRateResponse {
  retcode?: string;
}

/**
 * Params defines the parameters for the module.
 */
export type SrvaultParams = object;

export interface SrvaultQueryAllFixedDepositResponse {
  FixedDeposit?: SrvaultFixedDeposit[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SrvaultQueryAllKycResponse {
  kyc?: SrvaultKyc[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SrvaultQueryAllRegionVaultResponse {
  regionVault?: SrvaultRegionVault[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SrvaultQueryFixedDepositByAcctResponse {
  FixedDeposit?: SrvaultFixedDeposit[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SrvaultQueryFixedDepositByRegionResponse {
  FixedDeposit?: SrvaultFixedDeposit[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SrvaultQueryGetFixedDepositResponse {
  FixedDeposit?: SrvaultFixedDeposit;
}

export interface SrvaultQueryGetKycResponse {
  kyc?: SrvaultKyc;
}

export interface SrvaultQueryGetRegionVaultResponse {
  regionVault?: SrvaultRegionVault;
}

export interface SrvaultQueryKycByRegionResponse {
  kyc?: SrvaultKyc[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface SrvaultQueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: SrvaultParams;
}

export interface SrvaultRegionAnnualRate {
  annualRate_1_months?: string;
  annualRate_3_months?: string;
  annualRate_6_months?: string;
  annualRate_12_months?: string;
  annualRate_24_months?: string;
  annualRate_48_months?: string;
}

export interface SrvaultRegionVault {
  regionId?: string;
  name?: string;
  Admin?: string;
  feeRate?: string;
  baseAccountAddr?: string;
  fixedDepositAccountAddr?: string;
  bonusAccountAddr?: string;
  annualRate?: SrvaultRegionAnnualRate;
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title srvault/bonus.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryFixedDepositAll
   * @summary Queries a list of FixedDeposit items.
   * @request GET:/srs-poa/srvault/fixed_deposit
   */
  queryFixedDepositAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryAllFixedDepositResponse, RpcStatus>({
      path: `/srs-poa/srvault/fixed_deposit`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryFixedDeposit
   * @summary Queries a FixedDeposit by id.
   * @request GET:/srs-poa/srvault/fixed_deposit/{id}
   */
  queryFixedDeposit = (id: string, params: RequestParams = {}) =>
    this.request<SrvaultQueryGetFixedDepositResponse, RpcStatus>({
      path: `/srs-poa/srvault/fixed_deposit/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryFixedDepositByAcct
   * @summary Queries a list of FixedDepositByAcct items.
   * @request GET:/srs-poa/srvault/fixed_deposit_by_acct/{account}
   */
  queryFixedDepositByAcct = (
    account: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      query_type?: "QUERY_ALL" | "QUERY_NOT_EXPIRED" | "QUERY_EXPIRED";
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryFixedDepositByAcctResponse, RpcStatus>({
      path: `/srs-poa/srvault/fixed_deposit_by_acct/${account}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryFixedDepositByRegion
   * @summary Queries a list of FixedDepositByRegion items.
   * @request GET:/srs-poa/srvault/fixed_deposit_by_region/{regionid}
   */
  queryFixedDepositByRegion = (
    regionid: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      query_type?: "QUERY_ALL" | "QUERY_NOT_EXPIRED" | "QUERY_EXPIRED";
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryFixedDepositByRegionResponse, RpcStatus>({
      path: `/srs-poa/srvault/fixed_deposit_by_region/${regionid}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKycAll
   * @summary Queries a list of Kyc items.
   * @request GET:/srs-poa/srvault/kyc
   */
  queryKycAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryAllKycResponse, RpcStatus>({
      path: `/srs-poa/srvault/kyc`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKyc
   * @summary Queries a Kyc by index.
   * @request GET:/srs-poa/srvault/kyc/{account}
   */
  queryKyc = (account: string, params: RequestParams = {}) =>
    this.request<SrvaultQueryGetKycResponse, RpcStatus>({
      path: `/srs-poa/srvault/kyc/${account}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKycByRegion
   * @summary Queries a list of KycByRegion items.
   * @request GET:/srs-poa/srvault/kyc_by_region/{regionid}
   */
  queryKycByRegion = (
    regionid: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryKycByRegionResponse, RpcStatus>({
      path: `/srs-poa/srvault/kyc_by_region/${regionid}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/srs-poa/srvault/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<SrvaultQueryParamsResponse, RpcStatus>({
      path: `/srs-poa/srvault/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRegionVaultAll
   * @summary Queries a list of RegionVault items.
   * @request GET:/srs-poa/srvault/region_vault
   */
  queryRegionVaultAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SrvaultQueryAllRegionVaultResponse, RpcStatus>({
      path: `/srs-poa/srvault/region_vault`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRegionVault
   * @summary Queries a RegionVault by index.
   * @request GET:/srs-poa/srvault/region_vault/{regionId}
   */
  queryRegionVault = (regionId: string, params: RequestParams = {}) =>
    this.request<SrvaultQueryGetRegionVaultResponse, RpcStatus>({
      path: `/srs-poa/srvault/region_vault/${regionId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}

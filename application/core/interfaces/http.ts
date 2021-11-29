export interface HttpResponseInterface {
    statusCode?: number,
    body?: any

}

export interface HttpRequestInterface {
    body?: any,
    params?: any,
    headers?: any,
}

export interface HttpWrongRequestInterface{
    statusCode: number,
    body: string
}
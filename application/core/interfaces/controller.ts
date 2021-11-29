import { HttpResponseInterface, HttpRequestInterface } from "./http";


export interface ControllerInterface {
    handle(httpRequest : HttpRequestInterface) : Promise<HttpResponseInterface>
}
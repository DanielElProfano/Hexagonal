import { HttpResponseInterface, HttpRequestInterface } from "./http";
import { Request } from "express";


export interface ControllerInterface {
    handle(httpRequest : HttpRequestInterface, req: Request) : Promise<HttpResponseInterface>
}
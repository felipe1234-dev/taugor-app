import { RouteState } from "@local/types";
import isLocation from "./isLocation";

export default function isRouteState(object: any): object is RouteState {
    let isRouteState: boolean = true;
    
    if (!object) {
        isRouteState = false;
    }
    
    if ("from" in object && !isLocation((object as RouteState).from)) {
        isRouteState = false;
    }
    
    if ("background" in object && !isLocation((object as RouteState).background)) {
        isRouteState = false;
    }
    
    if (!("from" in object && "background" in object)) {
        isRouteState = false;
    }
    
    return isRouteState;
};
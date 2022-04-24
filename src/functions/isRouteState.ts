import { RouteState } from "@local/types";
import isLocation from "./isLocation";

export default function isRouteState(object: any): object is RouteState {
    switch(true) {
        case !object || typeof object !== "object":
        case "from" in object && !isLocation((object as RouteState).from):
        case "background" in object && !isLocation((object as RouteState).background):
        case !("from" in object || "background" in object):
            return false;
        default: 
            return true;
    }
};
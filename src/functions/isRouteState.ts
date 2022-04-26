import { RouteState } from "@local/interfaces";
import isLocation from "./isLocation";

export default function isRouteState(object: any): object is RouteState {
    switch(true) {
        case !object || typeof object !== "object":
        case "from" in object && !isLocation((object as RouteState).from):
        case "background" in object && !isLocation((object as RouteState).background):
        case "enableLoader" in object && typeof object.enableLoader !== "boolean":
        case !("from" in object || "background" in object || "enableLoader" in object):
            return false;
        default: 
            return true;
    }
};
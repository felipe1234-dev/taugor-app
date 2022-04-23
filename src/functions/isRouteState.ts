import { RouteState } from "@local/types";
import isLocation from "./isLocation";

export default function isRouteState(object: any): object is RouteState {
    let isRoute: boolean = true;
    
    if (!object) {
        isRoute = false;
    }
    
    if ("from" in object && !isLocation((object as RouteState).from)) {
        isRoute = false;
    }
    
    if ("openDialog" in object && typeof object.openDialog !== "boolean") {
        isRoute = false;
    }
    
    return isRoute;
};
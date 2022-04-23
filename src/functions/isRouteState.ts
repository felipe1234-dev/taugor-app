import { RouteState } from "@local/types";
import isLocation from "./isLocation";

export default function isRouteState(object: any): object is RouteState {
    return (
        !!object && 
        (object as RouteState).from !== undefined 
        && isLocation((object as RouteState).from)
    );
};
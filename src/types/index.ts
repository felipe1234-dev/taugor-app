import { 
    FieldPath,
    OrderByDirection,
    WhereFilterOp
} from "firebase/firestore";
import { Location } from "react-router-dom";
import { 
    ENV_TYPES,
    PRIORITY_TYPES, 
    STATUS_TYPES
} from "@local/constants/index";

export type RouteState = { from: Location };

export type DialogState = { dialogLocation: Location };

export type Severity = "error" | "warning" | "info" | "success";

export type Alert = { message: string, severity: Severity }

export type WhereClasule = readonly [FieldPath|string, WhereFilterOp, unknown];

export type OrderByClasule = readonly [FieldPath|string, OrderByDirection];

export type Status = typeof STATUS_TYPES[number];

export type Priority = typeof PRIORITY_TYPES[number];

export type Environment = typeof ENV_TYPES[number];
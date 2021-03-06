import { 
    FieldPath,
    OrderByDirection,
    WhereFilterOp
} from "firebase/firestore";
import { 
    ENV_TYPES,
    PRIORITY_TYPES, 
    STATUS_TYPES,
    INFLUENCED_USERS,
    TAGS
} from "@local/constants";

export type Severity = "error" | "warning" | "info" | "success";

export type WhereClasule = readonly [FieldPath|string, WhereFilterOp, unknown];

export type OrderByClasule = readonly [FieldPath|string, OrderByDirection];

export type Status = typeof STATUS_TYPES[number];

export type Priority = typeof PRIORITY_TYPES[number];

export type Environment = typeof ENV_TYPES[number];

export type Influence = typeof INFLUENCED_USERS[number];

export type Tag = typeof TAGS[number];
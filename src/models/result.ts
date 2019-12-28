import { Pet } from "./pet";

export interface Result {
    limit?: number;
    offset?: number;
    pages?: number;
    page?: number;
    count?: number;
    result: Pet[];
}
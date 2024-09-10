import { Moment } from "moment";
import { Result } from "../Core/Logic/Result";
import { AppError } from "../Core/Logic/AppError";
export declare function createProposal(transaction: unknown, expirationTime: Moment, reviewPeriod: number): Promise<Result<AppError, boolean>>;

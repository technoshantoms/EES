import { Fees } from "./types";
import OperationsType = Fees.OperationsType;
export declare function loadAllOperations(): Promise<OperationsType>;
export declare function getScaleAndNetworkPercentOfFee(): Promise<[number, number]>;

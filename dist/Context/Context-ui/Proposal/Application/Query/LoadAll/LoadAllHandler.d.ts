import LoadAll from "./LoadAll";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import { loadAllParameters as loadAllParametersFunction } from "../../../../NetworkParameters/Facade";
import { loadAllOperations as loadAllOperationsFunction } from "../../../../Fees/Facade";
import { ProposalTypes } from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ParametersType = ProposalTypes.ParametersType;
import OperationsType = ProposalTypes.OperationsType;
import { NetworkParameters } from "../../../../NetworkParameters/types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;
import { Fees } from "../../../../Fees/types";
import NetworkOperationsType = Fees.OperationsType;
export default class LoadAllHandler {
    readonly repository: RepositoryInterface;
    readonly loadAllParameters: typeof loadAllParametersFunction;
    readonly loadAllOperations: typeof loadAllOperationsFunction;
    constructor(repository: RepositoryInterface, loadAllParameters: typeof loadAllParametersFunction, loadAllOperations: typeof loadAllOperationsFunction);
    execute(request: LoadAll): Promise<ProposalsType>;
    checkChangedParameters(networkParameters: NetworkParametersType, proposalParameters: ParametersType): void;
    checkChangedOperations(networkOperations: NetworkOperationsType, proposalOperations: OperationsType): void;
}

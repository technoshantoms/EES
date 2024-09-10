import GetLast from "./GetLast";
import HTLC from "../../../Domain/HTLC";
export default class GetLastHandler {
    execute(getLast: GetLast): HTLC;
}

import { Dayjs } from "dayjs";
import ValueObject from "../../Core/Domain/ValueObject";
interface TimeLockProps {
    value: Dayjs;
}
export default class TimeLock extends ValueObject<TimeLockProps> {
    private constructor();
    static fromUnix(timeLock: number): TimeLock;
    static fromDate(timeLock: Date): TimeLock;
    get unix(): number;
}
export {};

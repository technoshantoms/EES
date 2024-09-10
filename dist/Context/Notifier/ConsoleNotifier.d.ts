import NotifierInterface from "context/Notifier/NotifierInterface";
export default class ConsoleNotifier implements NotifierInterface {
    sendMessage(message: string): Promise<void>;
}

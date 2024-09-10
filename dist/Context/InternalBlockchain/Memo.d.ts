export default class Memo {
    generate(message: string, accountFromPrivateKey: any, accountFrom: any, accountTo: any): {
        from: any;
        to: any;
        nonce: any;
        message: any;
    };
    private getPublicKey;
    private encryptMessage;
}

class CustomErrorException extends Error {
    code: number;

    constructor(message: string, code: number = 400) {
        super(message)
        this.name = 'CustomErrorException';
        this.code = code;
    }
}

export { CustomErrorException }
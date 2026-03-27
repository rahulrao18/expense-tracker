import { to } from 'await-to-js';

export class GenericApplicationResponseDto<Datatype = any> {
    status: number;
    code: string;
    message: string;
    data?: Datatype;

    constructor({ status = 200, code = 'SUCCESS', message = 'Successfully done', data = null }) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export class ExceptionDto<ErrorType> {
    private readonly _message: string;
    private readonly _error: ErrorType;

    constructor(message: string, error: ErrorType) {
        this._error = error;
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    get error(): ErrorType {
        return this._error;
    }
}

export class ResultDto<DataType> {
    private readonly _message: string;
    private readonly _data: DataType;

    constructor(message: string, data: DataType) {
        this._data = data;
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    get data(): DataType {
        return this._data;
    }
}

export class MethodOutputDto<ErrorType = Error, ResultType = any> {

    private readonly _exception: ExceptionDto<ErrorType>;
    private readonly _result: ResultDto<ResultType>;

    constructor(dtoDef: { exception?: { message: string, error?: ErrorType }, result?: { message: string, data?: ResultType } }) {
        const { exception, result } = dtoDef;

        if (exception) this._exception = new ExceptionDto(exception.message, exception.error);
        else if(result) this._result = new ResultDto(result.message, result.data);
    }

    get exception(): ExceptionDto<ErrorType> {
        return this._exception;
    }

    get result(): ResultDto<ResultType> {
        return this._result;
    }

    public toString(): string {
        if(this._exception) return JSON.stringify(this._exception);

        return JSON.stringify(this._result);
    }
}

/**
 * @function tc
 * @description It takes promise as input and results value
 * @example // tc('<promise>');
 * @param {string} value
 * @returns {string}
 */
export const tc = async <T>(p: Promise<T>, errorExt?: any): Promise<[Error, T]> => to(p, errorExt);
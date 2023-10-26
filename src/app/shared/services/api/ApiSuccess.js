export class ApiSuccess {
    constructor({
        message = null,
        data = null,
        ok = true,
        httpCode = null,
        httpText = null,
    }) {

        let empty = null;
        const timestamp = new Date().getTime();

        if (Array.isArray(data)) {
            empty = data.length === 0;
        } else if (typeof data === 'object' && data !== null) {
            empty = Object.keys(data).length === 0;
        }

        // Define as propriedades de sucesso separadamente.
        this.message = message;
        this.data = data;
        this.empty = empty;
        this.ok = ok;
        this.httpCode = httpCode;
        this.httpText = httpText;
        this.timestamp = timestamp;

        // Define o sucesso como um objeto com informações.
        this.response = {
            message,
            data,
            empty,
            ok,
            httpCode,
            httpText,
            timestamp,
        };
    }
}

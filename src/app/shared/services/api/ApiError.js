export class ApiError extends Error {
    constructor({
        message = null,
        ok = false,
        httpCode = null,
        httpText = null,
        origin = "",
    }) {

        origin = "ApiError" + (origin ? " <- " : "") + origin;
        const timestamp = new Date().getTime();

        // Mensagem padrão para classe Error
        super(message);

        // Define as propriedades de erro separadamente.
        this.message = message;
        this.ok = ok;
        this.httpCode = httpCode;
        this.httpText = httpText;
        this.origin = origin;
        this.timestamp = timestamp;

        // Define o erro como um objeto com informações.
        this.error = {
            message,
            ok,
            httpCode,
            httpText,
            origin,
            timestamp
        };
    }
}

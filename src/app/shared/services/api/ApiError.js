export class ApiError extends Error {
    constructor({ message = null, origin = "" }) {
        origin = "ApiError" + (origin ? " <- " : "") + origin;
        const timestamp = new Date().getTime();

        // Mensagem padrão para classe Error
        super(message);

        // Define as propriedades de erro separadamente.
        this.status = "error";
        this.message = message;
        this.origin = origin;
        this.timestamp = timestamp;

        // Define o erro como um objeto com informações.
        this.error = {
            status: "error",
            message: message,
            origin,
            timestamp
        };
    }
}

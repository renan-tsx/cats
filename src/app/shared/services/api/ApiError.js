export class ApiError extends Error {
    constructor({ message = null, status = null, origin = "" }) {
        // Chama o construtor da classe Error, definindo a mensagem de erro.
        super(message);

        // Define as propriedades de erro separadamente.
        this.origin = "ApiError" + (origin ? " - " : "") + origin;
        this.message = message
        this.status = status;

        // Define o erro como um objeto com informações.
        this.error = {
            origin: "ApiError" + (origin ? " - " : "") + origin,
            message: message,
            status: status
        };
    }
}

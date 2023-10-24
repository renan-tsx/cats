export class ApiSuccess {
    constructor({ message = null, data = null, }) {
        const status = data.length ? "success" : "empty";
        const timestamp = new Date().getTime();

        // Define as propriedades de sucesso separadamente.
        this.message = message;
        this.data = data;
        this.status = status;
        this.timestamp = timestamp;

        // Define o sucesso como um objeto com informações.
        this.response = {
            message,
            data,
            status,
            timestamp
        };
    }
}

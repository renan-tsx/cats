export class ApiSuccess {
    constructor({ data = null, message = null, status = null }) {
        // Define as propriedades de sucesso separadamente.
        this.success = true;
        this.data = data;
        this.message = message;
        this.status = status;

        // Define o sucesso como um objeto com informações.
        this.response = {
            success: true,
            data: data,
            message: message,
            status: status
        };
    }
}

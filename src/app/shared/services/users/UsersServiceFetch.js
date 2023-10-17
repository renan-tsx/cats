import { Api } from "../api/ApiConfig";
import { ApiError } from "../api/ApiError";
import { ApiSuccess } from "../api/ApiSuccess";

const getAll = async () => {
    try {
        const response = await fetch(`${Api().baseURL}/users`);
        const data = await response.json();

        if (response.status >= 400) {
            throw new ApiError({
                origin: "getAll",
                message: "Erro ao consultar os usuários",
                status: response.status,
            });
        }

        return new ApiSuccess({
            data: data,
            message: response.statusText,
            status: response.status,
        });
    } catch (error) {
        return error;
    }
};

const getById = async (id) => {
    try {
        const response = await fetch(`${Api().baseURL}/users/${id}`);
        const data = await response.json();

        if (response.status >= 400) {
            throw new ApiError({
                origin: "getById",
                message: "Erro ao consultar o usuário",
                status: response.status,
            });
        }

        return new ApiSuccess({
            data: data,
            message: response.statusText,
            status: response.status,
        });
    } catch (error) {
        return error;
    }
};

const getByEmail = async (email) => {
    try {
        const response = await fetch(`${Api().baseURL}/users/?email=${email}`);
        const data = await response.json();

        if (response.status === 404) {
            return new ApiError({
                origin: "getByEmail",
                message: "O usuário não existe",
                status: 404,
            });
        } else if (response.status >= 400) {
            throw new ApiError({
                origin: "getByEmail",
                message: "Erro ao consultar o usuário",
                status: response.status,
            });
        }

        return new ApiSuccess({
            data: data,
            message: response.statusText,
            status: response.status,
        });
    } catch (error) {
        return error;
    }
};

const create = async (dataToCreate) => {
    try {
        const emailCheck = await getByEmail(dataToCreate.email);

        if (emailCheck instanceof ApiError && emailCheck.status === 404) {
            const response = await fetch(`${Api().baseURL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToCreate),
            });

            const data = await response.json();

            if (response.status >= 400) {
                throw new ApiError({
                    origin: "create",
                    message: "Erro ao criar o usuário",
                    status: response.status,
                });
            }

            return new ApiSuccess({
                data: data,
                message: response.statusText,
                status: response.status,
            });
        } else {
            return new ApiError({
                origin: "create",
                message: "O usuário já existe",
                status: 409,
            });
        }
    } catch (error) {
        return error;
    }
};

const updateById = async (id, dataToUpdate) => {
    try {
        const idCheck = await getById(id);

        if (!(idCheck instanceof ApiError)) {
            const response = await fetch(`${Api().baseURL}/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToUpdate),
            });

            const data = await response.json();

            if (response.status >= 400) {
                throw new ApiError({
                    origin: "updateById",
                    message: "Erro ao atualizar o usuário",
                    status: response.status,
                });
            }

            return new ApiSuccess({
                data: data,
                message: response.statusText,
                status: response.status,
            });
        } else {
            return new ApiError({
                origin: "updateById",
                message: "O usuário não existe",
                status: 404,
            });
        }
    } catch (error) {
        return error;
    }
};

const deleteById = async (id) => {
    try {
        const idCheck = await getById(id);

        if (!(idCheck instanceof ApiError)) {
            const response = await fetch(`${Api().baseURL}/users/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.status >= 400) {
                throw new ApiError({
                    origin: "deleteById",
                    message: "Erro ao deletar o usuário",
                    status: response.status,
                });
            }

            return new ApiSuccess({
                data: data,
                message: response.statusText,
                status: response.status,
            });
        } else {
            return new ApiError({
                origin: "deleteById",
                message: "O usuário não existe",
                status: 404,
            });
        }
    } catch (error) {
        return error;
    }
};

export const UsersServiceFetch = {
    getAll,
    getById,
    getByEmail,
    create,
    updateById,
    deleteById
};

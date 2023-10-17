import { Api } from "../api/ApiConfig";
import { ApiError } from "../api/ApiError";
import { ApiSuccess } from "../api/ApiSuccess";

const getAll = async () => {
    try {
        const { data, status, statusText } = await Api().get("/users");

        return new ApiSuccess({
            data: data,
            message: statusText,
            status: status
        });
    } catch (error) {
        return new ApiError({
            origin: "getAll",
            message: "Erro ao consultar os usuários",
            status: error.response.status,
        });
    }
};

const getById = async (id) => {
    try {
        const { data, status, statusText } = await Api().get("/users/" + id);
        return new ApiSuccess({
            data: data,
            message: statusText,
            status: status
        });
    } catch (error) {
        return new ApiError({
            origin: "getById",
            message: "Erro ao consultar o usuário",
            status: error.response.status,
        });
    }
};

const getByEmail = async (email) => {
    try {
        const { data, status, statusText } = await Api().get("/users/?email=" + email);
        const alreadyExists = data.length

        if (alreadyExists) {
            return new ApiSuccess({
                data: data,
                message: statusText,
                status: status
            });
        }

        return new ApiError({
            origin: "getByEmail",
            message: "O usuário não existe",
            status: 404,
        });

    } catch (error) {
        return new ApiError({
            origin: "getByEmail",
            message: "Erro ao consultar o usuário",
            status: error.response.status,
        });
    }
};

const create = async (dataToCreate) => {
    try {
        const { status: statusUser } = await getByEmail(dataToCreate.email);

        if (statusUser !== 404) {
            return new ApiError({
                origin: "create",
                message: "O usuário já existe",
                status: 409,
            });
        }

        const { data, status, statusText } = await Api().post("/users", dataToCreate);

        return new ApiSuccess({
            data: data,
            message: statusText,
            status: status
        });
    } catch (error) {
        return new ApiError({
            origin: "create",
            message: "Erro ao criar o usuário",
            status: error.response.status,
        });
    }
};

const updateById = async (id, dataToUpdate) => {
    try {
        const { success: alreadyExists } = await getById(id);

        if (alreadyExists) {
            const { data, status, statusText } = await Api().patch("/users/" + id, dataToUpdate);
            return new ApiSuccess({
                data: data,
                message: statusText,
                status: status
            });
        }

        return new ApiError({
            origin: "updateById",
            message: "O usuário não existe",
            status: 404,
        });
    } catch (error) {
        return new ApiError({
            origin: "updateById",
            message: "Erro ao atualizar o usuário",
            status: error.response.status,
        });
    }
};

const deleteById = async (id) => {
    try {
        const { success: alreadyExists } = await getById(id);

        if (alreadyExists) {
            const { data, status, statusText } = await Api().delete("/users/" + id);
            return new ApiSuccess({
                data: data,
                message: statusText,
                status: status
            });
        }

        return new ApiError({
            origin: "deleteById",
            message: "O usuário não existe",
            status: 404,
        });
    } catch (error) {
        return new ApiError({
            origin: "deleteById",
            message: "Erro ao deletar o usuário",
            status: error.response.status,
        });
    }
};

export const UsersService = {
    getAll,
    getById,
    getByEmail,
    create,
    updateById,
    deleteById
};

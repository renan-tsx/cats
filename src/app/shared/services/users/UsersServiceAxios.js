import { Api } from "../api/ApiConfig";
import { ApiError } from "../api/ApiError";
import { ApiSuccess } from "../api/ApiSuccess";

const getAll = async () => {
    try {
        const { data } = await Api().axios.get("/users");

        return new ApiSuccess({
            message: "Usuários carregados com sucesso",
            data: data,
        });
    } catch (error) {
        return new ApiError({
            message: "Erro ao buscar os usuários",
            origin: getAll.name,
        });
    }
};

const getById = async (id) => {
    try {
        const { data } = await Api().axios.get(`/users/${id}`);

        return new ApiSuccess({
            message: "Usuário carregado com sucesso",
            data: [data],
        });
    } catch (error) {
        return new ApiError({
            message: "Erro ao buscar o usuário",
            origin: getById.name,
        });
    }
};

const getByEmail = async (email) => {
    try {
        const { data } = await Api().axios.get("/users/?email=" + email);
        const alreadyExists = data.length;

        if (alreadyExists) {
            return new ApiSuccess({
                message: "Usuário carregado com sucesso",
                data: data,
            });
        }

        return new ApiSuccess({
            message: "Usuário não existe",
            data: data,
        });

    } catch (error) {
        return new ApiError({
            message: "Erro ao consultar o usuário",
            origin: getByEmail.name,
        });
    }
};

const create = async (dataToCreate) => {
    try {
        const { status } = await getByEmail(dataToCreate.email);

        if (status === "success") {
            return new ApiError({
                message: "O usuário já existe",
                origin: create.name,
            });
        }

        const { data } = await Api().axios.post("/users", dataToCreate);

        return new ApiSuccess({
            message: "Usuário criado com sucesso",
            data: data,
        });
    } catch (error) {
        return new ApiError({
            message: "Erro ao criar o usuário",
            origin: create.name,
        });
    }
};

const updateById = async (id, dataToUpdate) => {
    try {
        const { status } = await getById(id);

        if (status === "error") {
            return new ApiError({
                message: "O usuário não existe",
                origin: updateById.name
            });
        }

        const { data } = await Api().axios.patch("/users/" + id, dataToUpdate);

        return new ApiSuccess({
            message: "Usuário atualizado com sucesso",
            data: [data],
        });
    } catch (error) {
        return new ApiError({
            message: "Erro ao atualizar o usuário",
            origin: updateById.name,
        });
    }
};

const deleteById = async (id) => {
    try {
        const { status } = await getById(id);

        if (status === "success") {
            const { data } = await Api().axios.delete("/users/" + id);

            return new ApiSuccess({
                message: "Usuário excluído com sucesso",
                data: [data],
            });
        }

        return new ApiError({
            message: "O usuário não existe",
            origin: deleteById.name,
        });
    } catch (error) {
        return new ApiError({
            message: "Erro ao deletar o usuário",
            origin: deleteById.name,
        });
    }
};

export const UsersServiceAxios = {
    getAll,
    getById,
    getByEmail,
    create,
    updateById,
    deleteById
};

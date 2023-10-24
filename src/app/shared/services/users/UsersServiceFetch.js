import { Api } from "../api/ApiConfig";
import { ApiError } from "../api/ApiError";
import { ApiSuccess } from "../api/ApiSuccess";

const getAll = async () => {
    try {
        const response = await fetch(`${Api().baseURL}/users`);
        const data = await response.json();

        if (response.ok) {
            return new ApiSuccess({
                message: "Usuários carregados com sucesso",
                data
            });
        }

        throw Error();

    } catch (error) {
        return new ApiError({
            message: "Erro ao buscar os usuários",
            origin: getAll.name,
        });
    }
};

const getById = async (id) => {
    try {
        const response = await fetch(`${Api().baseURL}/users/${id}`);
        const data = await response.json();

        if (response.ok && data.id) {
            return new ApiSuccess({
                message: "Usuário carregado com sucesso",
                data: [data],
            });
        }

        throw Error();

    } catch (error) {
        return new ApiError({
            message: "Erro ao buscar o usuário",
            origin: getById.name,
        });
    }
};

const getByEmail = async (email) => {
    try {
        const response = await fetch(`${Api().baseURL}/users/?email=${email}`);
        const data = await response.json();

        if (response.ok && data.length) {
            return new ApiSuccess({
                message: "Usuário carregado com sucesso",
                data,
            });
        }

        throw Error();

    } catch (error) {
        return new ApiError({
            message: "Erro ao buscar o usuário",
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

        const response = await fetch(`${Api().baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(dataToCreate),
        });

        if (response.status === 201) {
            const data = await response.json();

            return new ApiSuccess({
                message: "Usuário criado com sucesso",
                data: [data]
            });
        }

        throw Error;

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

        if (status === "success") {
            const response = await fetch(`${Api().baseURL}/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(dataToUpdate),
            });

            if (response.ok) {
                const data = await response.json();

                return new ApiSuccess({
                    message: "Usuário atualizado com sucesso",
                    data: [data]
                });
            }

            throw Error;
        }

        return new ApiError({
            message: "O usuário não existe",
            origin: updateById.name,
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
        const { status, data } = await getById(id);

        if (status === "success") {
            const response = await fetch(`${Api().baseURL}/users/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                return new ApiSuccess({
                    message: "Usuário excluído com sucesso",
                    data
                });
            }

            throw Error;
        }

        return new ApiError({
            message: "O usuário não existe",
            origin: deleteById.name,
        });

    } catch (error) {
        return new ApiError({
            message: "Erro ao atualizar o usuário",
            origin: updateById.name,
        });
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

import { useEffect, useState } from "react";
import { ApiError } from "../../services/api/ApiError";
import { UsersService } from "../../services/users";

export const ContentTest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Teste: Buscar todos os usuários
    UsersService.getAll().then((res) => {
      if (res instanceof ApiError) {
        console.log(res.error);
      } else {
        console.log(res.response);
        setUsers(res.response.data);
      }
    });

    // // Teste: Buscar usuário por ID
    // UsersService.getById("1").then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("instanceof ApiError", res.error);
    //   } else {
    //     console.log("getById res", res.response);
    //   }
    // });

    // // Teste: Buscar usuário por ID inexistente
    // UsersService.getById("5").then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("getById instanceof ApiError", res.error);
    //   } else {
    //     console.log("getById res", res.response);
    //   }
    // });

    // // Teste: Buscar usuário por email
    // UsersService.getByEmail("maria@gmail.com").then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("getByEmail instanceof ApiError", res.error);
    //   } else {
    //     console.log("getByEmail res", res.response);
    //   }
    // });

    // // Teste: Buscar usuário por email inexistente
    // UsersService.getByEmail("joaobot@gmail.com").then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("getByEmail instanceof ApiError", res.error);
    //   } else {
    //     console.log("getByEmail res", res.response);
    //   }
    // });

    // const newUser = {
    //   name: "Matheus",
    //   last_name: "Lima da Silva",
    //   email: "matheus@gmail.com",
    //   password: "bot",
    //   date_created: new Date().getTime(),
    //   date_updated: null,
    // };

    // // Teste: Criar um novo usuário
    // UsersService.create(newUser).then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("create instanceof ApiError", res.error);
    //   } else {
    //     setUsers((prev) => [...prev, newUser]);
    //     console.log("create res", res.response);
    //   }
    // });

    // const updateUser = {
    //   name: "Matheus bot",
    //   last_name: "Lima da Silva",
    //   email: "matheusbot@gmail.com",
    //   date_updated: new Date().getTime(),
    // };

    // // Teste: Atualizar um usuário existente
    // UsersService.updateById(4, updateUser).then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("updateById instanceof ApiError", res.error);
    //   } else {
    //     console.log("updateById res", res.response);
    //   }
    // });

    // // Teste: Atualizar um usuário inexistente
    // UsersService.updateById(999, updateUser).then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("instanceof ApiError", res.error);
    //   } else {
    //     console.log("updateById res", res);
    //   }
    // });

    // // Teste: Deletar um usuário
    // UsersService.deleteById(4).then((res) => {
    //   if (res instanceof ApiError) {
    //     console.log("deleteById instanceof ApiError", res.error);
    //   } else {
    //     console.log("deleteById res", res.response);
    //   }
    // });
  }, []);

  return (
    <>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </>
  );
};

import axios from "axios";

// 

export const Api = () => {
    const baseURL = "http://localhost:3333";
    return {
        baseURL,
        axios: axios.create({ baseURL })
    }
};
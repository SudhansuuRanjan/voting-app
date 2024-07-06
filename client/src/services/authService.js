import api from "../utils/api";

class AuthService {
    async login(email, password) {
        try {
            const response = await api.post("/auth/login", { email, password });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async register(email, password, name, age) {
        try {
            const response = await api.post("/auth/register", { email, password, name, age });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getProfile() {
        try {
            const response = await api.get("/auth/profile");
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async logout() {
        try {
            const response = await api.get("/auth/logout");
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default new AuthService();
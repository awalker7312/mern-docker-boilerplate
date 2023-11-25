import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.status === "success") {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
            axios.post(API_URL + "logout");
        }
    }

    register(firstName, lastName, email, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            email,
            password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    async validateSession() {
        try {
            const response = await axios.get(API_URL + "validate");
            this.updateLocalStorage(response.data);
            return response.data;
        } catch (error) {
            console.error("Error validating session", error);
            throw error;
        }
    }

    updateLocalStorage(data) {
        if (data.status === "success") {
            localStorage.setItem("user", JSON.stringify(data));
        } else {
            localStorage.removeItem("user");
        }
    }
}

export default new AuthService();

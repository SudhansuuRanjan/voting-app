import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import AuthService from "../services/authService";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (user) => {
        try {
            const res = await AuthService.login(user.email, user.password);
            setUser(res.data);
            navigate("/dashboard");
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
        setLoading(false);
        navigate("/");
    }

    const checkUser = async () => {
        try {
            const res = await AuthService.getProfile();
            setUser(res.data);
            setLoading(false);
            return res;
        } catch (error) {
            setUser(null);
            setLoading(false);
        }
    }

    const signUp = async (user) => {
        try {
            await AuthService.register(user.email, user.password, user.name, user.age);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    const contextData = {
        user,
        handleLogin: login,
        handleLogout: logout,
        handleSignUp: signUp,
        refresh: checkUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div className="flex flex-col gap-16 items-center justify-center min-h-screen">
                <div className="flex gap-3 items-center">
                    <img src="apple-icon.png" alt="Logo" className="w-16" />
                    <div className="flex divide-x divide-gray-600 gap-3">
                        <p className="text-white text-xl font-semibold">NIT,<br /> Patna</p>
                        <p className="text-xl font-semibold text-sky-500 pl-2">ALUMNI<br /> ASSOCIATION</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Loader /> <span className="font-medium text-white pl-3 text-lg">Loading...</span>
                </div>
            </div> : children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };
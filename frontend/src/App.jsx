import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Logout from "./components/Logout.jsx";

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get("/api/user/session")
            .then((response) => {
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                } else {
                    localStorage.removeItem("user");
                    if (location.pathname !== "/signup") {
                        navigate("/signin");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [navigate]);

    return (
        <div className="wrapper">
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

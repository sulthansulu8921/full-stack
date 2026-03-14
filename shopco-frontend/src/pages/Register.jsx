import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import "../styles/login.css";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === "succeeded" && !error) {
            navigate("/login");
        }
    }, [status, error, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        dispatch(register({ username, email, password }));
    };

    return (
        <section className="login-wrapper">
            <div className="container">
                <form className="login-card" onSubmit={handleRegister}>
                    <h2 className="login-title">Create Account</h2>

                    {error && <p className="login-error">{typeof error === 'string' ? error : Object.values(error)[0]}</p>}

                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        required
                    />

                    <button type="submit" className="login-btn" disabled={status === 'loading'}>
                        {status === 'loading' ? "Creating Account..." : "Register"}
                    </button>

                    <p className="login-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Register;

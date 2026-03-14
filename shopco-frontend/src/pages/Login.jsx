import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(login({ username, password }));
  };

  return (
    <section className="login-wrapper">
      <div className="container">
        <form className="login-card" onSubmit={handleLogin}>
          <h2 className="login-title">Welcome Back</h2>

          {error && <p className="login-error">{typeof error === 'string' ? error : (error.detail || error.error || "Login failed")}</p>}

          <input
            name="username"
            type="text"
            placeholder="Username"
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
            {status === 'loading' ? "Logging in..." : "Login"}
          </button>

          <p className="login-text">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;

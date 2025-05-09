import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginForm = () => {
  // Separate state variables for each input field
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const [isLoading, setIsLoading] = useState(false);

  // No longer need a generic handleChange for an object.
  // Each input's onChange will call its respective setter.

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous messages and set loading state
    setMessage("");
    setMessageType("");
    setIsLoading(true);

    // Basic client-side validation
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      // Make the POST request to the login API endpoint
      // Sending username and password directly from their state variables
      const res = await axios.post('http://localhost:3004/api/login', { username, password });

      // On successful login
      setMessage(res.data.message || "Login successful!");
      setMessageType("success");
      console.log('Login successful:', res.data);

      // --- IMPORTANT: Handle successful login here ---
      // You would typically save the authentication token (if returned by the server)
      // and redirect the user to a dashboard or protected route.
      // Example:
      // localStorage.setItem('authToken', res.data.token);
      // navigate('/dashboard'); // If using useNavigate hook from react-router-dom
      // window.location.href = '/dashboard';
      // --- End of successful login handling ---

      // Reset form fields
      setUsername('');
      setPassword('');

    } catch (err) {
      // On login failure
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        const serverMsg = err.response.data.message || err.response.data.error || "Login failed.";
        setMessage(serverMsg);
      } else if (err.request) {
        // Request was made but no response was received (e.g., server is down)
        setMessage("No response from server. Please check your network connection or try again later.");
      } else {
        // Something else happened in setting up the request
        setMessage(`An unexpected error occurred: ${err.message}`);
      }
      setMessageType("error");
      console.error('Login error:', err.response || err);
    } finally {
      // Always reset loading state, regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-box">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Message Display Area */}
          {message && (
            <div
              className={`alert ${
                messageType === "success" ? "alert-success" : "alert-error"
              } mb-4`}
            >
              <div>
                <span>{message}</span>
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="input input-bordered w-full rounded-box"
              value={username} // Controlled by 'username' state
              onChange={(e) => setUsername(e.target.value)} // Update 'username' state directly
              required
              disabled={isLoading} // Disable input during loading
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered w-full rounded-box"
              value={password} // Controlled by 'password' state
              onChange={(e) => setPassword(e.target.value)} // Update 'password' state directly
              required
              disabled={isLoading} // Disable input during loading
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full rounded-box ${
                isLoading ? "loading" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </div>

          {/* Optional registration link */}
          <div className="mt-6 text-center">
            <Link to="/register" className="btn btn-link">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
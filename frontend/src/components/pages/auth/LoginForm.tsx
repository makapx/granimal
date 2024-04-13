import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createLoginAction } from '../../../store';
/**
 * React component for login form
 * 
 * @property {void} handleSubmit - Handle form submit
 * @property {void} handleEmailChange - Handle email input change
 * @property {void} handlePasswordChange - Handle password input change
 * @property {void} handleRememberMeChange - Handle remember me checkbox change
 * @property {void} handleForgotPassword - Handle forgot password link click
 * @property {void} handleSignUp - Handle sign up link click
 * 
 * @returns {JSX.Element} JSX Element
 */
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rem, setRem] = useState(false);

  const router = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLoginAction({username, password})
      .then( action => {
        dispatch(action);
        navigate('/');
      });
  }

  /**
   * Bind email input value to state
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  /**
   * Bind password input value to state
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  /**
   * Bind remember me checkbox value to state
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
   */
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRem(e.target.checked);
  }

  /**
   * Handle forgot password link click
   * 
   * @param {React.MouseEvent<HTMLAnchorElement>} e event object for anchor click
   */
  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // TODO: Implement forgot password functionality
    e.preventDefault();
  }

  /**
   * Handle sign up link click
   * 
   * @param {React.MouseEvent<HTMLAnchorElement>} e event object for anchor click
   */
  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router('/signup');
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-base-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-neutral"
              >
                Username
              </label>
              <input
                type="username"
                name="text"
                id="username"
                className="bg-base-100 text-neutral sm:text-sm rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-neutral"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-base-100 text-neutral sm:text-sm rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-primary rounded bg-primary"
                    checked={rem}
                    onChange={handleRememberMeChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-neutral"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-neutral hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-base-100 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-neutral">
              Don’t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-neutral hover:underline"
                onClick={handleSignUp}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
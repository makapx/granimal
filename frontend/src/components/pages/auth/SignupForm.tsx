import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
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
const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);


    useEffect(() => {
        if (password === passwordRepeat) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [password, passwordRepeat]);

    const router = useNavigate();
    
    /**
     * Handle sign up form submit
     * 
     * @param {React.FormEvent} e event object for form submit
     * 
     * @returns {void}
     */
    const handleSubmit = (e: React.FormEvent) => {
        if(password !== passwordRepeat) {
            setPasswordMatch(false);
        }

        if(password === "" || passwordRepeat === "" || email === "") {
            return;
        }

        e.preventDefault();
    }

    /**
     * Bind email input value to state
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
     * 
     * @returns {void}
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    /**
     * Bind password input value to state
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
     * 
     * @returns {void}
     */
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    /**
     * Bind password repeat input value to state
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e event object for input change
     * 
     * @returns {void}
     */
    const handlePasswordRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(e.target.value);
    }

    /**
     * Handle sign up link click
     * 
     * @param {React.MouseEvent<HTMLAnchorElement>} e event object for anchor click
     * 
     * @returns {void}
     */
    const handleSignin = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router('/login');
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
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-neutral"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-base-100 text-neutral sm:text-sm rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                    placeholder="youremail@mail.com"
                    value={email}
                    onChange={handleEmailChange}
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
                <div>
                  <label
                    htmlFor="password-repeat"
                    className="block mb-2 text-sm font-medium text-neutral"
                  >
                    Password repeat
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-base-100 text-neutral sm:text-sm rounded-lg focus:outline-primary focus:border-primary block w-full p-2.5"
                    value={passwordRepeat}
                    onChange={handlePasswordRepeatChange}
                  />
                </div>
                { !passwordMatch && <p className="text-sm text-error">Passwords do not match</p>}
                <button
                  type="submit"
                  className="w-full text-base-100 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 disabled:bg-gray-400"
                  disabled={password === "" || passwordRepeat === "" || email === "" || !passwordMatch}
                >
                  Signup
                </button>
                <p className="text-sm font-light text-neutral">
                  Do you have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-neutral hover:underline"
                    onClick={handleSignin}
                  >
                    Signin
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
    );
}

export default SignupForm;
import React, { useEffect, useState } from "react";
import "./login.css";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useLogin } from "../../hook/useLogin";

function Login() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
    const { login, error, isLoading } = useLogin();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, pass)

  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    setTimeout(() => {
      window.alert(
        `To explore the feature of this application here is the temporary id and pass for all account
      Admin:
          email: lowe@gmail.com
          pass: lowe
      Hr:
          email: hr@gmail.com
          pass: hr
      Employee:
          email: employee@example.com
          pass: employee
      `
      );
    }, 500);
  }, []);
  return (
    <div className="h-screen bg-[#2b447b] m-auto absolute w-screen">
      <div className="mt-16">
        <div id="main-outer-div">
          <div id="logo-div">
            {/* <img id="logo-img" src={Logo} alt="" /> */}
          </div>
          <div id="title-div">
            <h4 className="title">Sign in</h4>
          </div>

          <div id="outer-login-form-div">
            <form action="" method="" onSubmit={handleSubmit}>
              <input
                className="login-form-input"
                type="text"
                placeholder="Email"
                required="required"
                name="email"
                onChange={handleEmail}
              />
              <input
                className="login-form-input"
                type="password"
                placeholder="Password"
                required="required"
                name="password"
                onChange={handlePass}
              />
              <input
                className="login-form-input"
                type="submit"
                value="Sign in"
                id="submitBtn"
              />
              {error ? (
                <p className="alert">Invalid UserName or Password</p>
              ) : (
                ""
              )}
            </form>
          </div>

          <div className="loading">
            <ScaleLoader
              css={override}
              sizeunit={"px"}
              size={150}
              color={"#123abc"}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

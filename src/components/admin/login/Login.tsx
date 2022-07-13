import "./login.scss";

import { useState } from "react";
import axios from "axios";
import qs from "qs";
import { url } from "../../../config";
import { useRecoilState } from "recoil";
import { LoginInfo } from "../../../types/login";
import { loginState } from "../../../recoil/loginState";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const [globalLoginInfo, setGlobalLoginInfo] = useRecoilState(loginState);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      username: e.target.value,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      password: e.target.value,
    });
  };

  const onLogin = () => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(loginInfo),
      url: url + "login",
    };
    axios(options)
      .then((res) => {
        alert("Login Successful");
        setGlobalLoginInfo(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failed");
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <p>Login to Jaethem8 Admin</p>
        <table>
          <tbody>
            <tr>
              <td>username</td>
              <td>
                <input type="text" onChange={(e) => onUsernameChange(e)} />
              </td>
            </tr>
            <tr>
              <td>password</td>
              <td>
                <input type="password" onChange={(e) => onPasswordChange(e)} />
              </td>
            </tr>
            <tr>
              <td>Login?</td>
              <td>
                <button onClick={() => onLogin()}>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

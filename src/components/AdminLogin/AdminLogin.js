import React, { useState } from "react";
import "./adminlogin.scss";

import { API_BASE_URL } from "../../support/constants";
import storageHelper from "../../support/storageUtils";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const fieldsCompleted = () => {
    if (email === "") {
      setWarning("Debe ingresar un email");
      return false;
    }
    if (password === "") {
      setWarning("Debe ingresar su contraseña");
      return false;
    }
    return true;
  };

  const handleBlur = (e) => {
    if (e.currentTarget.value !== "") {
      setWarning(null);
    }
  };
  const handleChange = (setter) => (e) => setter(e.target.value);
  const handleSubmit = () => {
    if (!fieldsCompleted()) return;
    fetch(`${API_BASE_URL}/sign_in`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        session: {
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => storageHelper.setLocal("access_token", json.token))
      .catch((err) => setWarning("Correo o contraseña erróneos"));
  };
  return (
    <section data-testid="login-form">
      <h2>Ingreso de administrador</h2>
      <input
        name="email"
        title="Ingrese su email"
        type="text"
        value={email}
        onChange={handleChange(setEmail)}
        onBlur={handleBlur}
      />
      <input
        name="password"
        title="Ingrese su email"
        type="password"
        alt="Ingrese su contraseña"
        value={password}
        onChange={handleChange(setPassword)}
        onBlur={handleBlur}
      />
      {warning && <p className="admin-login-warning">{warning}</p>}
      <button onClick={handleSubmit}>Ingresar</button>
    </section>
  );
};

export default AdminLogin;

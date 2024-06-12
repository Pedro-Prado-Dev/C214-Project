import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import "./css/login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Cria uma instância do navigate


  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: username,
    password: password,
  }),
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    Swal.fire({
      icon: "success",
      title: "Uhuuuul",
      text: "Logado com sucesso!",
    });
    navigate('/home-page');
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Senha ou usuário incorretos!",
    });
  }
})
.catch(error => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Senha ou usuário incorretos!",
  });

});

    
  };

  return (
    <div className="formulario-body">
      <div className="formulario-card">
        <div className="formulario-title">
            <h1>Academico</h1>
        </div>
        
        <form className="formuario-infos">
          <div className="forumalario-input">
            <input
              placeholder="Matrícula"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="forumalario-input" >
            <input
              placeholder="Senha"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </form>
        <button  onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState, useEffect } from "react";

import "./css/home.css";
import Class from "./class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [userClassesInfo, setUserClassesInfo] = useState([])
  const [userGradesInfo, setUserGradesInfo] = useState([])
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  // Use useEffect para carregar os dados do localStorage
  useEffect(() => {
    // Recupera o usuário do localStorage
    
    if (user) {
      // Converte a string JSON de volta para um objeto JavaScript
      // Define o estado com o ID do usuário
      fetch(`http://localhost:5000/api/students/${userData.id}/schedule`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter o horário do aluno");
          }
          return response.json();
        })
        .then((data) => {
          setUserClassesInfo(data)
        })
        .catch((error) => {
          // Trate o erro conforme necessário
        });
        fetch(`http://localhost:5000/api/students/${userData.id}/grades`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter o horário do aluno");
          }
          return response.json();
        })
        .then((data) => {
          setUserGradesInfo(data)
        })
        .catch((error) => {
          // Trate o erro conforme necessário
        });
    }
  }, []); // O segundo parâmetro vazio [] assegura que o useEffect seja executado apenas uma vez

  return (
    <div className="home-body">
      <div className="home-card">
        <div className="home-title">
          <FontAwesomeIcon icon={faBars} className="icon" />
          <spam>Inatel</spam>
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
        <div className="home-classes">
          <div className="home-classes-title">Today's Classes</div>
          <div className="home-classes-body">
            {
              userClassesInfo.map(user=>(
                <Class userId = {userData.id} grades = {userGradesInfo} user={user}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import "./css/home.css";
import Class from "./class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [userClassesInfo, setUserClassesInfo] = useState([]);
  const [userGradesInfo, setUserGradesInfo] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);

      fetch(`http://localhost:5000/api/students/${userData.id}/schedule`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter o horário do aluno");
          }
          return response.json();
        })
        .then((data) => {
          setUserClassesInfo(data);
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(`http://localhost:5000/api/students/${userData.id}/grades`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter as notas do aluno");
          }
          return response.json();
        })
        .then((data) => {
          setUserGradesInfo(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []); // O segundo parâmetro vazio [] assegura que o useEffect seja executado apenas uma vez

  return (
    <div className="home-body">
      <div className="home-card">
        <div className="home-title">
          <FontAwesomeIcon icon={faBars} className="icon" />
          <span>Inatel</span>
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
        <div className="home-classes">
          <div className="home-classes-title">Today's Classes</div>
          <div className="home-classes-body">
            {userClassesInfo.map((userClass) => (
              <Class key={userClass.id} userId={userClass.id} grades={userGradesInfo} user={userClass} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

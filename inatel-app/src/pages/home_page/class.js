import React,{useState} from "react";
import "./css/class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Class(props) {
  console.log(props.user); // Certifique-se de que props.subject esteja definido corretamente aqui

  const [showTable, setShowTable] = useState(false);

  const handleArrowClick = () => {
    setShowTable(!showTable); // Alternar o estado showTable ao clicar na seta
  };
  console.log(props.userGradesInfo)

  return (
    <div className="class-body">
      <div className="class-img">
        <div className="img"></div>
      </div>
      <div className="class-content">
        <div className="class-content-info">
          <span>{props.user.subject}</span>
          <span>{props.user.time}</span>
        </div>
        <div className="class-content-table">
        {showTable && (
          <table>
            <thead>
              <tr>
                <th>NP 1</th>
                <th>NP 2</th>
                {/* Adicione mais colunas conforme necessário */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{}</td>
                <td>{}</td>
                {/* Adicione mais linhas de dados conforme necessário */}
              </tr>
            </tbody>
          </table>
        )}
        </div>
      </div>
      <div onClick={handleArrowClick} className="class-arrow">
        <FontAwesomeIcon icon={faArrowRight} className="icon-arrow" />
      </div>
    </div>
  );
}

export default Class;

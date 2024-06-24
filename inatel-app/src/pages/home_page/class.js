import React,{useState, useRef} from "react";
import "./css/class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Class(props) {
  console.log(props.grades[0]); // Certifique-se de que props.subject esteja definido corretamente aqui

  const [showTable, setShowTable] = useState(false);

  const arrowRef = useRef(null); // Usar useRef para acessar o ícone da seta

  const handleArrowClick = () => {
    setShowTable(!showTable); // Alternar o estado showTable ao clicar na seta
    if (arrowRef.current) {
      arrowRef.current.style.transform = showTable ? 'rotate(90deg)' : 'rotate(270deg)';
    }
  };

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
                <td>{props.grades[0]['NP1']}</td>
                <td>{props.grades[0]['NP2']}</td>
                {/* Adicione mais linhas de dados conforme necessário */}
              </tr>
            </tbody>
          </table>
        )}
        </div>
      </div>
      <div onClick={handleArrowClick} className="class-arrow">
        <FontAwesomeIcon icon={faArrowRight} ref={arrowRef}  className="icon-arrow" />
      </div>
    </div>
  );
}

export default Class;

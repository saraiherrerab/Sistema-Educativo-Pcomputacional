// pages/index.tsx
import './styles.css'; 
import DonutChart from "../../components/donutChart/donutChart";
import PieChart from "../../components/pieChart/pieChart";

export default function Reportes() {
  return (
    <>
        <div className="bigContainer">
            <div className="container-left">
                <div className="container1-1">
                        <span>holi</span>
                </div>
                <div className="container1-2">
                        <div className="tortaGraph">
                            <PieChart value1={65} value2={35} />
                        </div>
                </div>
            </div>
            
            <div className="container-right">
                <div className="container2">
                    <div className="c2ls">
                        <div className="pieGraph">
                            <DonutChart percentage1={60} percentage2={40} />
                        </div>
                    </div>

                    <div className="c2right">
                            <div className="c2rs">
                                <span>holi</span>
                            </div>
                            <div className="c2ri">
                                3
                            </div>
                    </div>
                </div>
                <div className="container3">
                    <div className="container3-1">
                        <div>Contenido Columna 1.1</div>
                        <div>Contenido Columna 1.2</div>
                    </div>
                    <div className="container3-2"> 
                        <div>Contenido Columna 1.1</div>
                        <div>Contenido Columna 1.2</div>
                    </div>
                </div>
            </div>
                
        </div>
                
    </>
  
    
    
      
    
  );
}

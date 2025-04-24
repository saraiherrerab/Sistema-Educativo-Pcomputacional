'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import DonutChart from "../../components/donutChart/donutChart";
import PieChart from "../../components/pieChart/pieChart";

export default function Reportes() {
    const Router = useRouter();
  return (
    <>
        <Header
                    text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
                    text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                    text2="Menu" onClick2={() => Router.push("/videojuego")}
                    text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
                    text4="Salir" onClick4={() => Router.push("/videojuego")}>
                </Header>

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
                        <div className="container3-1-1">Contenido Columna 1.1</div>
                        <div className="container3-1-2">Contenido Columna 1.2</div>
                    </div>
                    <div className="container3-2"> 
                        <div className="container3-2-1">Contenido Columna 1.1</div>
                        <div className="container3-2-2">Contenido Columna 1.2</div>
                    </div>
                </div>
            </div>
                
        </div>
                
    </>
  
    
    
      
    
  );
}

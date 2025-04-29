'use client';
import { useEffect, useState } from "react";
import './styles.css';
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import DonutChart from "../../components/donutChart/donutChart";
import PieChart from "../../components/pieChart/pieChart";
import Notita from "../../components/nota/notita";
import Parametros from "../../components/parametros/parametros";
import Estrellas from "../../components/estrellas/estrellas";

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
                    <p className="tituloReporte">PREMIACIONES</p>
                    <Estrellas valores={[true, false, true]} />
                </div>
                <div className="container1-2">
                        <div className="tortaGraph">
                            <p className="tituloReporte">PORCENTAJE DE ACTIVIDADES COMPLETADAS</p>
                            <div className="leyenda">
                                    <div className="leyenda-item">
                                    <span className="color-box completado"></span>
                                    <span>Completado</span>
                                    </div>
                                    <div className="leyenda-item">
                                    <span className="color-box no-completado"></span>
                                    <span>No completado</span>
                                    </div>
                                </div>
                        </div>
                            <PieChart value1={65} value2={35} />
                           
                </div>
            </div>
            
            <div className="container-right">
                <div className="container2">
                    <div className="c2ls">
                        <div className="pieGraph">
                            <p className="tituloReporte">EFICIENCIA ALGORÍTMICA</p>
                                <DonutChart percentage1={60} percentage2={40} />
                                
                        </div>
                    </div>

                    <div className="c2right">
                            <div className="c2rs">
                                <Parametros parametroTitulo1="IDENTIFICACIÓN DE ERRORES" parametroTitulo2="DESAPROBADO" />
                            </div>
                            <div className="c2ri">
                                <Parametros parametroTitulo1="RECONOCIMIENTO DE PATRONES" parametroTitulo2="APROBADO" />
                            </div>
                    </div>
                </div>
                <div className="container3">
                        <div className="container3-1">
                            <div className="container3-1-1">
                                <Parametros parametroTitulo1="ABSTRACCIÓN" parametroTitulo2="DESAPROBADO" />
                            </div>
                            <div className="container3-1-2">
                                <Parametros parametroTitulo1="ASOCIACIÓN" parametroTitulo2="DESAPROBADO" />
                            </div>
                        </div>

                        <div className="container3-2"> 
                            <div className="container3-2-1">
                                <Parametros parametroTitulo1="CONSTRUCCIÓN DE ALGORITMOS" parametroTitulo2="APROBADO" />
                            </div>
                            <div className="container3-2-2">
                                <Notita NotitaTitulo1="Sarai Herrera" NotitaTitulo2="MiniExplorer"/>
                            </div>
                        </div>
                    </div>
            </div>
                
        </div>
                
    </>
  
    
    
      
    
  );
}

'use client';
import { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import { useParams, useRouter } from "next/navigation";
import DonutChart from "../../../components/donutChart/donutChart";
import PieChart from "../../../components/pieChart/pieChart";
import Notita from "../../../components/nota/notita";
import Parametros from "../../../components/parametros/parametros";
import Estrellas from "../../../components/estrellas/estrellas";
import NombreEs from "../../../components/nombreEs/nombreEs";

import './styles.css'


export default function Reportes( ) {
    const Router = useRouter();
    const params = useParams(); // Usa el hook useParams para acceder a los params
    const profileId = params.id;
    console.log("ID de la ruta dinámica:", profileId);
  return (

        <div className="contenedor_pagina">
            <div className="dimensiones_header">
                <Header
                        text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
                        text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                        text2="Menu" onClick2={() => Router.push("/videojuego")}
                        text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
                        text4="Salir" onClick4={() => Router.push("/videojuego")}>
                </Header>
            </div>
            
            <div className="contenedor_reporte">
                <div className=" contenedor_premiaciones_y_actividades altura_maxima">
                    <div className="contenedor_premiaciones">
                        Contenedor premiaciones
                    </div>
                    <div className="contenedor_actividades_completadas">
                        Contenedor actividades completadas
                    </div>
                </div>
                <div className="contenedor_estadisticas">
                    <div className="contenedor_eficiencia">
                        <div className="contenedor_eficiencia_diagrama">

                        </div>
                        <div className="contenedor_eficiencia_errores">
                            <div className="contenedor_identificacion_errores">
                                Errores
                            </div>
                            <div className="contenedor_reconocimiento_patrones">
                                Patrones
                            </div>

                        </div>
                    </div>
                    <div className="contenedor_abstraccion">
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="contenedor_construccion">
                        <div>

                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
}

/*
<Header
                    text="MULTIPLAYER" onClick={() => Router.push("/videojuego")}
                    text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                    text2="Menu" onClick2={() => Router.push("/videojuego")}
                    text3="Mi perfil" onClick3={() => Router.push("/videojuego")}
                    text4="Salir" onClick4={() => Router.push("/videojuego")}>
        </Header>

<h1 className="tituloInforme">Informe de avance del estudiante</h1>
        <NombreEs Nombre="Perrucho" Apellido="Perez"></NombreEs>
        <div className="bigContainer body_reporte">
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

<div>
                <div >
                    <p>PREMIACIONES</p>
                    <Estrellas valores={[true, false, true]} />
                </div>
                <div>
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



*/
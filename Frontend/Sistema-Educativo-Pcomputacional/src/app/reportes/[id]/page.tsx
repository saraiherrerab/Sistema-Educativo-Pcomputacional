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

interface Estudiante {
  id_usuario: number,
  telefono: string,
  nombre: string,
  apellido: string,
  correo: string,
  edad: number,
  foto: string,
  usuario: string,
  clave_acceso: string,
  cedula: string,
  id_estudiante: number,
  condicion_medica: string,
  eficiencia_algoritmica: number,
  reconocimiento_patrones: boolean, 
  abstraccion: boolean,
  asociacion: boolean,
  identificacion_errores: boolean,
  construccion_algoritmos: boolean,
  p_actividades_completadas: number,
  tipo_premiacion: string,
  id_grupo: number,
  rol: string
}

interface Consulta_Horario {
  apellido: string;
  dia_semana: string;
  hora_fin: string;
  hora_inicio: string;
  id_curso: number;
  id_grupo: number;
  id_horario: number;
  id_profesor: number;
  nombre: string;
  nombre_curso: string;
  nombre_grupo: string;
}

interface Profesor {
    id_usuario: number,
    telefono: string,
    nombre: string,
    apellido: string,
    correo: string,
    edad: number,
    foto: string,
    usuario: string,
    clave_acceso: string,
    cedula: string,
    id_profesor: number,
    curriculum: string,
    formacion: string
}

export default function Reportes( ) {
    const Router = useRouter();
    const params = useParams(); // Usa el hook useParams para acceder a los params
    const profileId = params.id

    const [usuario, setUsuario] = useState<Estudiante>(
        {
          id_usuario: 0,
          telefono: "",
          nombre: "",
          apellido: "",
          correo: "",
          edad: 0,
          foto: "",
          usuario: "",
          clave_acceso: "",
          cedula: "",
          id_estudiante: 0,
          condicion_medica: "",
          eficiencia_algoritmica: 0,
          reconocimiento_patrones: false,
          abstraccion: false,
          asociacion: false,
          identificacion_errores: false,
          construccion_algoritmos: false,
          p_actividades_completadas: 0,
          tipo_premiacion: "",
          id_grupo: 0,
          rol: ""
        }
    );

    const [horarios, setHorarios] = useState<Consulta_Horario[]>([])
    const [profesor, setProfesor] = useState<Profesor>(
            {
                id_usuario: 0,
                telefono: "",
                nombre: "",
                apellido: "",
                correo: "",
                edad: 0,
                foto: "",
                usuario: "",
                clave_acceso: "",
                cedula: "",
                id_profesor: 0,
                curriculum: "",
                formacion: ""
            }
        );
    const obtenerDatosUsuario = async () => {
    
        const datosEstudiante = await fetch("http://localhost:5555/estudiantes/" + profileId)
        const resultadoConsulta = await datosEstudiante.json()
        console.log(resultadoConsulta)

        const resultadoHorarios = await obtenerHorariosAlumno(resultadoConsulta.id_grupo)
        console.log(resultadoHorarios)

        const resultadoProfesor = (resultadoHorarios ?? []) ? await obtenerDatosProfesor(resultadoHorarios[0].id_profesor) : null

        if(resultadoProfesor){
            console.log(resultadoProfesor)
            setProfesor(resultadoProfesor)
        }

        setHorarios ([...resultadoHorarios])

        setUsuario(resultadoConsulta)
        

    };

    const obtenerDatosProfesor = async (id_profesor_alumno: number) => {
    
        const datosProfesor = await fetch("http://localhost:5555/profesores/" + id_profesor_alumno)
        const resultadoConsulta = await datosProfesor.json()
        console.log(resultadoConsulta)

        setProfesor(resultadoConsulta)

    };

    const obtenerHorariosAlumno = async (id_grupo: number) => {
    
        const datosHorario = await fetch(`http://localhost:5555/grupos/${id_grupo}/curso`)
        const resultadoConsulta = await datosHorario.json()
        console.log(resultadoConsulta)
        return resultadoConsulta;

    };

  useEffect(() => {
    obtenerDatosUsuario()
  }, []);


    console.log("ID de la ruta dinámica:", profileId);
  return (

        <div className="contenedor_pagina">
            <div className="dimensiones_header">
                <Header
                        text="MULTIPLAYER" onClick={() => Router.push("/AMenu")}
                        text1="Panel de Juegos" onClick1={() => Router.push("/videojuego")}
                        text2="Menu" onClick2={() => Router.push("/AMenu")}
                        text3="Mi perfil" onClick3={() => Router.push("/profile-adm")}
                        text4="Salir" onClick4={() => Router.push("/")}>
                </Header>
            </div>
            
            <div className="contenedor_reporte">
                <div>
                    <h1 className="tituloInforme">Informe de avance del estudiante</h1>
                    <NombreEs Nombre={usuario.nombre} Apellido={usuario.apellido}></NombreEs>
                </div>
                <div className="contenedor_informacion">
                    <div className=" contenedor_premiaciones_y_actividades altura_maxima">
                        <div className="contenedor_premiaciones">
                            <div>
                                <p className="tituloReporte">PREMIACIONES</p>
                                <p className="sangria_20">Estrellas {usuario.tipo_premiacion.split(',').length} / 3</p>
                            </div>
                            <div>
                                <Estrellas valores={[true, false, false]} />
                            </div>
                        </div>
                        <div className="contenedor_actividades_completadas">
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
                            <PieChart value1={usuario.p_actividades_completadas} value2={100 - usuario.p_actividades_completadas} />
                        </div>
                    </div>
                    <div className="contenedor_estadisticas">
                        <div className="contenedor_eficiencia">
                            <div className="contenedor_eficiencia_diagrama">
                                <div className="pieGraph">
                                    <p className="tituloReporte">EFICIENCIA ALGORÍTMICA</p>
                                    <DonutChart percentage1={usuario.eficiencia_algoritmica} percentage2={100 - usuario.eficiencia_algoritmica} />
                                        
                                </div>
                            </div>
                            <div className="contenedor_eficiencia_errores">
                                <div className="contenedor_identificacion_errores">
                                    <Parametros parametroTitulo1="IDENTIFICACIÓN DE ERRORES" parametroTitulo2={(usuario.identificacion_errores) ? "APROBADO" : "DESAPROBADO"} />
                                </div>
                                <div className="contenedor_reconocimiento_patrones">
                                    <Parametros parametroTitulo1="RECONOCIMIENTO DE PATRONES" parametroTitulo2={(usuario.reconocimiento_patrones) ? "APROBADO" : "DESAPROBADO"} />
                                </div>

                            </div>
                        </div>
                        <div className="contenedor_abstraccion">
                            <div className="contenedor_abstraccion_abstraccion">
                                <Parametros parametroTitulo1="ABSTRACCIÓN" parametroTitulo2={(usuario.abstraccion) ? "APROBADO" : "DESAPROBADO"} />
                            </div>
                            <div className="contenedor_abstraccion_asociacion">
                                <Parametros parametroTitulo1="ASOCIACIÓN" parametroTitulo2={(usuario.asociacion) ? "APROBADO" : "DESAPROBADO"} />
                            </div>
                        </div>
                        <div className="contenedor_construccion">
                            <div className="contenedor_construccion_construccion">
                                <Parametros parametroTitulo1="CONSTRUCCIÓN DE ALGORITMOS" parametroTitulo2={(usuario.construccion_algoritmos) ? "APROBADO" : "DESAPROBADO"} />
                            </div>
                            <div className="contenedor_construccion_profesor">
                                <Notita NotitaTitulo1={(profesor.id_profesor) ? profesor.nombre + " " + profesor.apellido : "" } NotitaTitulo2={(horarios.length > 0) ? horarios[0].nombre_curso : "No está en un curso"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
}
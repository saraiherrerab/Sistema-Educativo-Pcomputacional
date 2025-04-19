'use client';
import { useEffect, useRef, useState } from "react";
import './styles.css';
import Header  from "../../components/header/header";
import { useRouter } from "next/navigation";

export default function EstudiantesLista() {
    const Router = useRouter();
    const [estudiantes, setEstudiantes] = useState([
        { id: 1, nombre: 'Ana', apellido: 'García', nivel: '1', usuario: '', contrasenia: '', perfil: '', estado: '' },
        { id: 2, nombre: 'Carlos', apellido: 'Pérez', nivel: '1', usuario: '', contrasenia: '', perfil: '', estado: '' },
        { id: 3, nombre: 'Sofía', apellido: 'Martínez', nivel: '1', usuario: '', contrasenia: '', perfil: '', estado: '' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEstudiantes, setFilteredEstudiantes] = useState([...estudiantes]);

    const filterStudents = () => {
        const results = estudiantes.filter(estudiante =>
            estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.perfil.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.estado.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Resultados de la búsqueda:", results);
        setFilteredEstudiantes(results);
    };

    const agregarEstudiante = (nuevoEstudiante: any) => {
        const nuevoEstudianteConId = { ...nuevoEstudiante, id: Date.now() };
        setEstudiantes((prevEstudiantes) => [
            ...prevEstudiantes,
            nuevoEstudianteConId,
        ]);
        // Actualizar también filteredEstudiantes para que la tabla se re-renderice con el nuevo estudiante
        setFilteredEstudiantes((prevFilteredEstudiantes) => [
            ...prevFilteredEstudiantes,
            nuevoEstudianteConId,
        ]);
    };

    const handleAgregarClick = () => {
        const nuevo = { nombre: 'Luis', apellido: 'Rodríguez', nivel: '1', usuario: '', contrasenia: '', perfil: '', estado: '' };
        agregarEstudiante(nuevo);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterStudents();
    };

    const handleSearchClick = () => {
        filterStudents();
    };

    const handleTitleClick = () => {
        window.location.reload(); // Esta es la forma más sencilla de recargar la página
        // O puedes usar Router.reload() si estás dentro del contexto de Next.js Router
        // Router.reload();
    };

    return (
        <>
        <div className="encabezado-fondo"></div>
            <Header 
                        text="MULTIPLAYER" onClick={()=>Router.push("/videojuego")}
                        text1="Panel de Juegos" onClick1={()=>Router.push("/videojuego")}
                        text2="Menu" onClick2={()=>Router.push("/videojuego")}
                        text3="Mi perfil" onClick3={()=>Router.push("/videojuego")}
                        text4="Salir" onClick4={()=>Router.push("/videojuego")}>
            </Header>

        <div className="listado">
        
            <div className="encabezado">
               
       
                <div className="tituloListado" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                    <h2 className="estudiantes">ESTUDIANTES</h2>
                </div>
                <div className="barraBusqueda">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Buscar estudiantes..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <img
                            src="./lupa-icon.png"
                            alt="Buscar"
                            className="search-icon"
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nivel</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Perfil</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEstudiantes.map((estudiante) => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.apellido}</td>
                            <td>{estudiante.nivel}</td>
                            <td>{estudiante.usuario}</td>
                            <td>{estudiante.contrasenia}</td>
                            <td>{estudiante.perfil}</td>
                            <td>{estudiante.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAgregarClick}>Agregar Nuevo Estudiante (Simulado)</button>
        </div>
        </>
            
        
    );
}
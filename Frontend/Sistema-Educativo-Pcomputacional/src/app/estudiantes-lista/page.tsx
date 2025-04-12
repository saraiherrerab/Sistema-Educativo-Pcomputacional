'use client';
import { useEffect, useRef, useState } from "react";
import './styles.css';
import { useRouter } from "next/navigation";

export default function EstudiantesLista() {
    const Router = useRouter();
    const [estudiantes, setEstudiantes] = useState([
        { id: 1, nombre: 'Ana', apellido: 'García', nivel:'1', usuario:'', contrasenia:'', perfil:'', estado:'' },
        { id: 2, nombre: 'Carlos', apellido: 'Pérez', nivel:'1', usuario:'', contrasenia:'', perfil:'', estado:'' },
        { id: 3, nombre: 'Sofía', apellido: 'Martínez', nivel:'1', usuario:'', contrasenia:'', perfil:'', estado:'' },
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
        setEstudiantes((prevEstudiantes) => [
            ...prevEstudiantes,
            { ...nuevoEstudiante, id: Date.now() },
        ]);
    };

    const handleAgregarClick = () => {
        const nuevo = { nombre: 'Luis', apellido: 'Rodríguez', nivel:'1', usuario:'', contrasenia:'', perfil:'', estado:'' };
        agregarEstudiante(nuevo);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchClick = () => {
        filterStudents();
    };

    return (
        <div className="listado">
            <div className="tituloListado">
                 <h2 className="estudiantes">ESTUDIANTES</h2>
            </div>
            <div className="barraBusqueda">
                <input
                    type="text"
                    placeholder="Buscar estudiantes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchClick}>Buscar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nivel</th>
                        <th>Usuario</th>
                        <th>Contrasenia</th>
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
    );
}
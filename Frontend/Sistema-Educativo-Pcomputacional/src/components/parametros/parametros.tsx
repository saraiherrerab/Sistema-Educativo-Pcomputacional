import './parametros.css';

interface ParametrosProps {
    parametroTitulo1: string;
    parametroTitulo2: 'APROBADO' | 'DESAPROBADO';
}

export default function Parametros({ parametroTitulo1, parametroTitulo2 }: ParametrosProps) {
    const estadoClase = parametroTitulo2 === 'APROBADO' ? 'verde' : 'rojo';

    return (
        <div className="parametros-container">
            <p className="parametroTitulo1 parametros-texto">{parametroTitulo1}</p>
            <p className={`parametroTitulo2 parametros-texto ${estadoClase}`}>{parametroTitulo2}</p>
        </div>
    );
}

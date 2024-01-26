import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const Listado = ({ colaboradores, deleteItem }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Género</th>
          <th>Edad</th>
          <th>Cargo</th>
          <th>Teléfono</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {colaboradores.map((colaborador) => (
          <tr key={colaborador.id}>
            {/* Celda para mostrar el ID del colaborador */}
            <td>{colaborador.id}</td>
            {/* Celda condicional para mostrar la foto o un mensaje si no hay foto */}
            <td>
              {colaborador.genero === "O" ? (
                <span>No hay foto</span>
              ) : (
                <img
                  // Construcción de la URL de la foto basada en el género del colaborador
                  src={`https://randomuser.me/api/portraits/${
                    colaborador.genero === "M" ? "men" : "women"
                  }/${colaborador.id}.jpg`}
                  alt={`Foto de ${colaborador.nombre}`}
                  // Estilo de la imagen con ancho, alto y bordes redondeados
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              )}
            </td>
            {/* Celdas para mostrar otros detalles del colaborador con estilo para manejar desbordamiento de texto */}
            <td className="fix-text-overflow">{colaborador.nombre}</td>
            <td className="fix-text-overflow">{colaborador.correo}</td>
            <td className="fix-text-overflow">{colaborador.genero}</td>
            <td className="fix-text-overflow">{colaborador.edad}</td>
            <td className="fix-text-overflow">{colaborador.cargo}</td>
            <td className="fix-text-overflow">{colaborador.telefono}</td>
            {/* Celda con un botón para eliminar el colaborador */}
            <td>
              <button
                className="btn btn-link"
                onClick={() => deleteItem(colaborador.id)}
              >
                {/* Icono de papelera en rojo */}
                <i className="fa-2xl fa-solid fa-circle-minus text-danger"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Definición de propTypes para las props del componente
Listado.propTypes = {
  colaboradores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
      edad: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      cargo: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      genero: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

// Exportación del componente Listado
export default Listado;

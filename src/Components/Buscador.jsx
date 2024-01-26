import PropTypes from "prop-types";

const Buscador = ({ terminoBusqueda, onChanges }) => {
  return (
    <input
      style={{ width: "320px" }}
      className="form-control mb-3 mx-left text-center"
      type="text"
      placeholder="Busca un colaborador"
      value={terminoBusqueda}
      onChange={onChanges}
    />
  );
};

Buscador.propTypes = {
  terminoBusqueda: PropTypes.string.isRequired,
  onChanges: PropTypes.func.isRequired,
};

export default Buscador;

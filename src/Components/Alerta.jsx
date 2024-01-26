import PropTypes from "prop-types";

const Alerta = ({ alerta }) =>
  alerta.mensaje && (
    <div className={`mt-3 alert alert-${alerta.tipo}`} role="alert">
      {alerta.mensaje}
    </div>
  );

Alerta.propTypes = {
  alerta: PropTypes.shape({
    mensaje: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
  }).isRequired,
};

export default Alerta;

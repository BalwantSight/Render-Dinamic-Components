import React from "react";
import PropTypes from "prop-types";

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nombrecompletoPattern = /^[\w\sáéíóúÁÉÍÓÚ]+ [\w\sáéíóúÁÉÍÓÚ]+$/; //Regex que incopora Nombres con Acentos
const generoPattern = /^[FMO]$/;
const telefonoPattern = /^\+569\d{8}$/;
const edadPattern = /^(1[8-9]|[2-9]\d+)$/;

const Formulario = ({ agregarColaborador, setAlerta }) => {
  const [nuevoColaborador, setNuevoColaborador] = React.useState({
    nombre: "",
    correo: "",
    genero: "",
    edad: "",
    cargo: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoColaborador({ ...nuevoColaborador, [name]: value });
  };

  const validarCampo = (valor, regex, mensajeError) => {
    if (!regex.test(valor)) {
      setAlerta({ mensaje: mensajeError, tipo: "danger" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, correo, genero, edad, cargo, telefono } = nuevoColaborador;

    if (
      !nombre.trim() ||
      !correo.trim() ||
      !genero.trim() ||
      !edad.trim() ||
      !cargo.trim() ||
      !telefono.trim()
    ) {
      setAlerta({
        mensaje: "Para agregar colaborador ingrese todos los datos solicitados",
        tipo: "warning",
      });
      return;
    }

    if (
      !validarCampo(
        nombre,
        nombrecompletoPattern,
        "Se debe ingresar nombre y al menos un  apellido"
      )
    )
      return;
    if (!validarCampo(correo, emailPattern, "Ingrese un correo válido")) return;
    if (
      !validarCampo(
        genero,
        generoPattern,
        "Ingrese F (Femenino), M (Masculino) u o (Otro) según corresponda su género"
      )
    )
      return;
    if (
      !validarCampo(
        edad,
        edadPattern,
        "Mayoría de edad requerida. Ingrese solo números  (ej: 28)"
      )
    )
      return;
    if (
      !validarCampo(
        telefono,
        telefonoPattern,
        "Ingrese un teléfono válido (ej: +56912345678)"
      )
    )
      return;

    agregarColaborador(nuevoColaborador);

    setNuevoColaborador({
      nombre: "",
      correo: "",
      genero: "",
      edad: "",
      cargo: "",
      telefono: "",
    });

    setAlerta({
      mensaje: "Se ha agregado colaborador exitosamente",
      tipo: "success",
    });
  };

  return (
    <form
      className="d-flex flex-column form-group gap-3 col-12"
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="form-control text-center"
          type="text"
          name="nombre"
          placeholder="Nombre Completo del Colaborador"
          value={nuevoColaborador.nombre}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className="form-control text-center"
          type="text"
          name="correo"
          placeholder="Correo del Colaborador"
          value={nuevoColaborador.correo}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className="form-control text-center"
          type="text"
          name="genero"
          placeholder="Género: (F)emenino, (M)asculino u (O)tro"
          value={nuevoColaborador.genero}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className="form-control text-center"
          type="text"
          min="18"
          name="edad"
          placeholder="Edad del Colaborador"
          value={nuevoColaborador.edad}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className="form-control text-center"
          type="text"
          name="cargo"
          placeholder="Cargo del Colaborador"
          value={nuevoColaborador.cargo}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className="form-control text-center"
          type="tel"
          name="telefono"
          placeholder="Teléfono del Colaborador"
          value={nuevoColaborador.telefono}
          onChange={handleChange}
        />
      </label>
      <button className="btn btn-info text-black" type="submit">
        Agregar Colaborador
      </button>
    </form>
  );
};

Formulario.propTypes = {
  agregarColaborador: PropTypes.func.isRequired,
  setAlerta: PropTypes.func.isRequired,
};

export default Formulario;

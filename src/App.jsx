import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Listado from "./Components/Listado";
import Formulario from "./Components/Formulario";
import Buscador from "./Components/Buscador";
import Alerta from "./Components/Alerta";
import BaseColaboradores from "./BaseColaboradores";

const App = () => {
  // Estado para almacenar la lista de colaboradores
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);

  // Estado para gestionar las alertas
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  // Estado para almacenar el término de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  // Función para agregar un nuevo colaborador a la lista
  const agregarColaborador = (colaborador) => {
    colaborador.id = +colaboradores[colaboradores.length - 1].id + 1;
    setColaboradores([...colaboradores, colaborador]);
  };

  // Función para eliminar un colaborador de la lista
  const deleteItem = (id) => {
    const listFilter = colaboradores.filter(
      (colaborador) => colaborador.id !== id
    );
    setColaboradores(listFilter);
  };

  // Manejador para actualizar el término de búsqueda
  const handleTerminoBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  // Función para filtrar la lista de colaboradores según el término de búsqueda
  const filterColaboradores = () => {
    const terminoBusquedaLowerCase = terminoBusqueda.toLowerCase();
    return colaboradores.filter((colaborador) =>
      // Filtrar por cualquier valor de tipo string que contenga el término de búsqueda
      Object.values(colaborador).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(terminoBusquedaLowerCase)
      )
    );
  };

  return (
    <div className="container-none px-4">
      <h1 className="text-center p-5" style={{ fontWeight: "bold" }}>
        <i className="fa-solid fa-users"></i>
        <span>&nbsp;&nbsp;</span>Lista de Colaboradores
      </h1>
      {/* Componente Buscador para gestionar el término de búsqueda */}
      <Buscador
        terminoBusqueda={terminoBusqueda}
        onChanges={handleTerminoBusqueda}
      />
      <div className="row">
        <div className="listado col-lg-8 col-12">
          {/* Componente Listado para mostrar la lista de colaboradores */}
          <Listado
            colaboradores={filterColaboradores()}
            deleteItem={deleteItem}
            data-spy="scroll"
          />
        </div>
        <div className="agregar col-lg-4 col-12 d-flex justify-content-center">
          <div>
            <h2 className="p-4">Agregar colaborador</h2>
            {/* Componente Formulario para agregar nuevos colaboradores */}
            <Formulario
              agregarColaborador={agregarColaborador}
              setAlerta={setAlerta}
            />
            {/* Componente Alerta para mostrar mensajes de alerta */}
            <Alerta alerta={alerta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

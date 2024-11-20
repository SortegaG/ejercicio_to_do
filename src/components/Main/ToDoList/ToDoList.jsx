import React, { useState, useEffect } from "react";
import ToDoItem from './ToDoItem';
import data from "./data";
import { v4 as uuidv4 } from 'uuid';
import FormEdit from "./FormEdit";


const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [values, setValues] = useState({ task: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);



  useEffect(() => {
    console.log("useEffect ejecutado: cargando datos...");
    setTimeout(() => {
      setItems(data);
      setIsLoading(false);
      console.log("Datos cargados:", data);
    }, 5000);
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      console.log("Tiempo agotado, limpiando input");
      setValues({ task: '' }); // Vaciar input tras 20 segundos
    }, 20000);

    setTimeoutId(id); // Guardar nuevo temporizador
  };

  //e es Evento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.task.length < 6) {
      alert('La tarea debe contener al menos 6 caracteres');
      return;
    }

    console.log('Tarea enviada:', values.task);
    addItem(values);
    setValues({ task: '' });

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }
  };

  const renderItems = () => {
    return items.map((item, i) => (
      <ToDoItem
        data={item}
        key={uuidv4()}
        remove={() => removeItem(i)}
        edit={() => editItem(i)}
      />
    ));
  };

  const addItem = (new_item) => {
    setItems([...items, new_item]);
  };

  const removeAllItem = () => {
    setItems([]);
  };

  const resetItems = () => {
    setItems(data);
  };

  const removeItem = (i) => {
    const remainingItems = items.filter((_, index) => index !== i);
    alert(`Item borrado: ${items[i]?.title || 'desconocido'}`);
    setItems(remainingItems);
  };

  const editItem = (index) => {
    setSelectedItem({ ...items[index], "index": index }); // Guardamos el ítem y su índice
  };

  const updateItem = (objetoItem) => {
    // 1. Crear una copia del array de items
    const dataOriginal = [...items];

    console.log("objetoItem.index===", objetoItem.index)
    // 2. Seleccionar el elemento que se quiere actualizar usando su índice
    const indexToUpdate = objetoItem.index;

    /* dataOriginal
    [
      { "title": "CList Item 1", "description": "Descripción del item 1"},
      { "title": "CList Item 2", "description": "Descripción del item 2"},
      { "title": "CList Item 3", "description": "Descripción del item 3"}
    ]

    objetoItem
    [
      { "title": "CList Item 1aaa", "description": "Descripción del item 1", "index":0},
      { "title": "CList Item 2", "description": "Descripción del item 2", "index":1},
      { "title": "CList Item 3", "description": "Descripción del item 3", "index":2}
    ] */

    // Combinar el ítem actual con los nuevos valores
    dataOriginal[indexToUpdate] = {
      ...dataOriginal[indexToUpdate], // Mantener los valores originales del ítem
      ...objetoItem,                // Sobrescribir con los valores actualizados
    };

    // Actualizar el estado con el array modificado
    setItems(dataOriginal);

    // Limpiar el ítem seleccionado (finalizar edición)
    setSelectedItem(false);
  };

  return (
    <div>
      {
        selectedItem
          ?
          <>
            <h3>Modo: Edicción</h3>
            <FormEdit item={selectedItem} onSubmittt={updateItem} />
          </>
          :
          <>
            <h1>Lista de tareas</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Tarea</label>
              <input type="text" name="task" value={values.task} onChange={handleChange} /><br />

              {values.task ? (
                <button type="submit">ADD</button>
              ) : (
                <p>Escribe algo para enviar</p>
              )}
            </form>
            {showMessage && <p style={{ color: 'green' }}>¡Tarea añadida!</p>}
            <button onClick={removeAllItem}>Borrar todo</button>
            <button onClick={resetItems}>Recargar todo</button>
            <button onClick={() => removeItem(0)}>Borrar primero</button>
            {renderItems()}
          </>
      }
    </div>
  );
};
export default ToDoList;
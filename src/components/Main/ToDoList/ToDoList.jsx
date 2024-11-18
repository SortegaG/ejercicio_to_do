import React, { useState, useEffect } from "react";
import ToDoItem from './ToDoItem';
import data from "./data";
import { v4 as uuidv4 } from 'uuid';


const ToDoList = () => {
  const [items, setItems] = useState(data);
  const [values, setValues] = useState({ task: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    console.log("useEffect ejecutado: cargando datos...");
    setTimeout(() => {
      setTasks(data); 
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

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
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

  const editItem = (i) => {
    const remainingItems = items.filter((_, index) => index !== i);
    alert(`Item borrado: ${items[i]?.title || 'desconocido'}`);
    setItems(remainingItems);
  };

  return (
    <div>
      <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tarea</label>
        <input type="text" name="task" value={values.task} onChange={handleChange}/><br/>

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
    </div>
  );
};
export default ToDoList;
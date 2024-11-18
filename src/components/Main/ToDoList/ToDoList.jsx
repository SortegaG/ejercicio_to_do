import React, { useState } from "react";
import ToDoItem from './ToDoItem'
import data from "./data";
import { v4 as uuidv4 } from 'uuid';
import './ToDoList.css'


const ToDoList = () => {


const [items, setItems] = useState(data)

// Estado del formulario  values es el estado y setValues es el metodo que modifica el estado
const [values, setValues] = useState({  // Values es el estado del formulario
  task: '',
});

const handleChange = (e) => {
  setValues({
      ...values,
      [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault()

  // 2 maneras de acceder a los datos del formulario

  // 1. Leyendo el evento
  // const title = e.target.title.value;
  // const description = e.target.description.value;
  // const price = e.target.price.value;
  // const img_url = e.target.img_url.value;

  // const new_item = { title, description, price, img_url };
  // addItem(new_item)

  // 2. Leyendo un estado de valores actuales
  setValues({task: ''});
  console.log(values)
  addItem(values)
  //console.log(values.task)
}

const renderItems = () => {
  return items.map((item, i) => <ToDoItem data={item} key={uuidv4()} remove={()=>removeItem(i)}/>) // Se envia por props estas variables
}
const addItem = (new_item) => {
  setItems([...items, new_item]) // Puedo cambiar el orden en el que pinta los items cambiando el orden en esta linea, en este caso lo pinta al final
}
const removeAllItem = () => {
  setItems([]) // actualiza el estado items
}
const resetItems = () => {
  setItems(data) // cargar con datos iniciales de nuevo
}

const removeItem = (i) => {
  const remainingItems = items.filter((item, index) => index!==i)
  setItems(remainingItems)
  alert(`Item borrado: ${items[i].title}`)
}

renderItems();
  return <div>
    <form class='task-container' onSubmit={handleSubmit}>

      <label htmlFor="name">Tarea</label>
      <input type="text" name="task" value={values.task} onChange={handleChange} /> <br />
      <button type="submit">ADD</button>

      </form>

      <button onClick={removeAllItem}>Borrar todo</button>
      <button onClick={resetItems}>Recargar todo</button>
      <button onClick={()=>removeItem(0)}>Borrar primero</button>

<h1>Lista de tareas</h1> 
  {renderItems()}
  </div>;

};

export default ToDoList;

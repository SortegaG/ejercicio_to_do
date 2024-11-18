import React from "react";
import './ToDoItem.css'

const ToDoItem = ({data, remove}) => {  // data y remove vienen de cristmas list
  const {task} = data
  return <article>
  <h3>Tarea:{task}</h3>
  <button onClick={remove}>Borrar</button>
</article>;
};

export default ToDoItem;

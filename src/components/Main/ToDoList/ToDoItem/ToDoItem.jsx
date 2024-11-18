import React from "react";

const ToDoItem = ({data, remove}) => {  // data y remove vienen de cristmas list
  const {task} = data
  return <article>
  <h3>Tarea:{task}</h3>
  {/* <p>Descripción:{description}</p>
  <p>Precio: {price}</p>
  <img src={img_url} alt={title} className="picture_item"/> */}
  <button onClick={remove}>Borrar</button>
</article>;
};

export default ToDoItem;

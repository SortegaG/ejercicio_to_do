
import React, { useState } from "react";

const FormEdit = ({ item, onSubmittt }) => {

	const [formData, setFormData] = useState(item);

	console.log(formData)
	const handleChange = (event) => {
		const { name, value } = event.target;
		//[event.target.name]: event.target.value
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// funcion prop emitida por el componente padre
		// donde enviamos todo el objeto 
		onSubmittt(formData); 
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Título:
					<input
						type="text"
						name="task"
						value={formData.title}
						onChange={handleChange}
					/>
				</label>
			</div>
			<button type="submit">Guardar Cambios</button>
		</form>
	);
};

export default FormEdit;
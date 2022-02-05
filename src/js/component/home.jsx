import React from "react";
import ToDo from "./todo.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container-md text-center mt-5 bg-dark">
			<div className="col-4 offset-4">
				<h1 className="text-light bg-danger rounded py-3 strokeme">
					~ to-do list ~
				</h1>
				<ToDo data="todos" />
			</div>
		</div>
	);
};

export default Home;

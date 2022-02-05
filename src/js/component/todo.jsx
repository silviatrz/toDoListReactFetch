import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ToDo = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [numbTasks, setNumbTasks] = useState(0);

	const postFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/silviatrz", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		}).catch(error => console.log(error));
	};

	const getFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/silviatrz")
			.then(resp => {
				if (resp.status === 404) postFetch();
				if (resp.ok) return resp.json();
			})
			.then(data => {
				setNumbTasks(data && data.length);

				if (Array.isArray(data)) {
					setTasks(data);
				}
			})
			.catch(error => console.log(error));
	};

	const putFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/silviatrz", {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		}).catch(error => {
			console.log(error);
		});
		setNumbTasks(tasks.length);
	};

	const delFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/silviatrz", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}).catch(error => console.error(error));
	};

	useEffect(() => {
		getFetch();
	}, []);

	useEffect(() => {
		if ((numbTasks != tasks.length) & (tasks.length != 0)) {
			putFetch();
		}
	}, [tasks]);

	const checkSubmit = inputValue => {
		for (let task of tasks) {
			if (inputValue.toLowerCase() === task.label.toLowerCase()) {
				setInputValue("");
				return false;
			}
		}

		return true;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (checkSubmit(inputValue)) {
			setNumbTasks(numbTasks + 2);
			setTasks(ls => [...ls, { label: inputValue, done: false }]);
			setInputValue("");
		}
	};

	const handleMouseEnter = n => {
		let items = [...tasks];
		for (let i in items) {
			if (i == n) {
				items[i].done = true;
			}
		}
		setTasks(items);
		setNumbTasks(items.length);
	};

	const handleMouseLeave = n => {
		let items = [...tasks];
		for (let i in items) {
			if (i == n) {
				items[i].done = false;
			}
		}
		setTasks(items);
		setNumbTasks(items.length);
	};

	const deleteElement = n => {
		setNumbTasks(tasks.length == 1 ? 0 : tasks.length - 2);
		let newList = [...tasks];
		newList.splice(n, 1);
		setTasks(newList);
	};

	return (
		<div className="border border-white rounded">
			<div className="bg-white">
				<form
					className="form-inline d-inline-flex py-1"
					onSubmit={handleSubmit}>
					<input
						type="text"
						className="text-center form-control border border-white"
						placeholder={
							tasks.length > 0
								? "What needs to be done?"
								: "No tasks, add a task"
						}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<button
						className="px-3 add-button rounded-pill bg-warning text-white"
						type="submit"
						disabled={inputValue ? "" : "disabled"}>
						Add
					</button>
				</form>
			</div>
			<ul className="list-unstyled">
				{tasks
					? tasks.map((value, key) => (
							<li
								className="card d-flex flex-row justify-content-between p-2 m-2"
								key={key}
								onMouseEnter={handleMouseEnter.bind(value, key)}
								onMouseLeave={handleMouseLeave.bind(
									value,
									key
								)}>
								{value.label}
								{value.done && (
									<span
										onClick={deleteElement.bind(
											value,
											key
										)}>
										<i className="fas fa-times"></i>
									</span>
								)}
							</li>
					  ))
					: "Cargando"}
			</ul>
			<ul className="d-flex flex-row justify-content-around text-white list-unstyled">
				<li className="card bg-dark text-white p-0" disabled>
					{tasks ? tasks.length : null} item
					{tasks & (tasks.length > 1) ? "s" : ""} left
				</li>
				{tasks.length > 0 ? (
					<li
						className="btn btn-outline-light py-0"
						onClick={() => {
							setTasks([]);
							delFetch();
							postFetch();
						}}>
						Delete all
					</li>
				) : (
					""
				)}
			</ul>
		</div>
	);
};

export default ToDo;

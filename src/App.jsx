import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todoList, setTodoList] = useState([
		{
			userId: 1,
			id: 201,
			title: 'Выполнить домашнее задание - реализовать список дел',
			completed: false,
		},
	]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedTodos) => setTodoList((prev) => [...prev, ...loadedTodos]));
	}, []);

	const handleCheck = (id) => {
		const updatedList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList(updatedList);
	};

	return (
		<div className={styles.App}>
			{todoList.map(({ id, title, completed }) => (
				<div className={styles.todo} key={id}>
					<div className={styles['todo__content']}>
						<strong>{title}</strong>
						{completed && <p>Выполнено</p>}
						<input
							type="checkbox"
							name="completed"
							checked={completed}
							id={id}
							onChange={() => handleCheck(id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

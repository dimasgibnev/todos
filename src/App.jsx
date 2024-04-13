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

	const [isComplited, setIsComplited] = useState(false);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedTodos) => setTodoList((prev) => [...prev, ...loadedTodos]));
	}, []);

	return (
		<div className={styles.App}>
			{todoList.map(({ id, title }) => (
				<div className={styles.todo} key={id}>
					<div className={styles['todo__content']}>
						<strong>{title}</strong>
						{isComplited && <p>Выполнено</p>}
						<input
							type="checkbox"
							name="complited"
							id={id}
							onChange={() => setIsComplited(!isComplited)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

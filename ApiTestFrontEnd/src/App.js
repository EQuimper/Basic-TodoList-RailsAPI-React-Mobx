import 'whatwg-fetch';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class App extends Component {
	componentDidMount() {
		fetch('http://localhost:3000/todos')
			.then(res => res.json())
			.then(resJson => {
				return this.props.store.todos = resJson.data.map(todo => todo);
			})
			.catch(err => console.log(err));
	}

	filter(e) {
		e.preventDefault();
		this.props.store.filter = e.target.value;
	}

	handleCreate(e) {
		if (e.which === 13) { // See if they press 'ENTER'
			fetch(`http://localhost:3000/todos`, {
				dataType: 'json',
				headers: { 'content-type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ name: e.target.value })
			})
				.then(res => res.json()) // Get res from the server and make it json
				.then(resJson => {
					this.props.store.createTodo(
						resJson.data.attributes.name,
						resJson.data.id
					);
				})
				.catch(err => console.log(err));
			e.target.value = ''; // Clear out the input after submit
		}
	}

	toggleCompleted(item) {
		this.props.store.toggleCompleted(item);
		fetch(`http://localhost:3000/todos/${item.id}`, {
			dataType: 'json',
			headers: { 'content-type': 'application/json' },
			method: 'PATCH',
			body: JSON.stringify({
				completed: this.props.store.todos.find(
					todo => todo.id === item.id
				).attributes.completed
			})
		});
	}

	handleDeleteTodo(id) {
		if (confirm('Are you sure you want to delete this todo ?')) {
			this.props.store.deleteTodo(id);
			fetch(`http://localhost:3000/todos/${id}`, {
				dataType: 'json',
				headers: { 'content-type': 'application/json' },
				method: 'DELETE'
			});
		}
	}

	render() {
		if (!this.props.store.todos) return <h1>Loading...</h1>;
		const { filter, filteredTodos, clearCompleted } = this.props.store;
		const todolist = filteredTodos.map(todo => (
			<li
				key={todo.id}
				style={{
					textDecoration: todo.attributes.completed ? 'line-through' : 'none'
				}}
			>
				{todo.attributes.name}
				<input
					type="checkbox"
					value={todo.attributes.completed}
					checked={todo.attributes.completed}
				  onChange={() => this.toggleCompleted(todo)}
				/>
				<button onClick={() => this.handleDeleteTodo(todo.id)}>&#10008;</button>
			</li>
		));
		return (
			<div className="App">
				<h1>My Todos</h1>
				<input type="text" onKeyPress={e => this.handleCreate(e)} placeholder="Add a new todo"/>
				<input type="text" value={filter} onChange={e => this.filter(e)}/>
				<ul>
					{todolist.length > 0 ? todolist : 'No todo'}
				</ul>
				<button onClick={clearCompleted}>Clear Completed</button>
			</div>
		);
	}
}

export default App;
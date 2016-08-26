import 'whatwg-fetch';
import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';

class App extends Component {
	constructor() {
		super();
		this.state = {}
	}

	componentDidMount() {
		fetch('http://localhost:3000/todos')
			.then(res => {
				return res.json();
			})
			.then(resJson => {
				const todos = resJson.data.map(todo => todo);
				return this.setState({
					todos
				});
			})
			.catch(err => console.log(err));
	}

	handleSubmit(e) {
		e.preventDefault();
		const name = this.refs.inputTodo.value;
		const lastItem = this.state.todos[this.state.todos.length - 1];
		const id = parseInt(lastItem.id) + 1;
		this.setState({
			todos: [...this.state.todos, {
				id,
				attributes: {
					name,
					completed: false
				}
			}]
		});
		fetch(`http://localhost:3000/todos`, {
			dataType: 'json',
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ name })
		});
		this.refs.inputTodo.value = '';
	}

	render() {
		if (!this.state.todos) return <h1>Loading...</h1>;
		const { todos } = this.state;
		return (
			<div className="App">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" placeholder="Add a new todo" ref="inputTodo"/>
					<input type="submit" value="Submit"/>
				</form>
				{todos.map((todo, i) => (
					<li key={i} style={{ listStyle: 'none' }}>
						<Todo todo={todo} />
					</li>
				))}
			</div>
		);
	}
}

export default App;

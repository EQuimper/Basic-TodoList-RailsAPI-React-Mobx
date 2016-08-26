import React, { Component } from 'react';

const styles = {
	list: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: this.props.todo.attributes.completed
		}
	}
	handleChecked() {
		this.setState({
			completed: !this.state.completed
		});
		console.log(this.state.completed);
		fetch(`http://localhost:3000/todos/${this.props.todo.id}`, {
			dataType: 'json',
			headers: { 'content-type': 'application/json' },
			method: 'PATCH',
			body: JSON.stringify({
				completed: !this.state.completed
			})
		});
	}
	render() {
		const { attributes } = this.props.todo;
		const { name } = attributes;
		return (
			<div style={styles.list}>
				<h4>{name}</h4>
				<input
					type="checkbox"
					checked={this.state.completed}
					onChange={() => this.handleChecked()}
				/>
			</div>
		)
	}
}
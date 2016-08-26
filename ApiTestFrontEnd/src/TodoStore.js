import { computed, observable } from 'mobx';

class Todo {
	@observable id;
	@observable attributes;

	constructor(value, id) {
		this.id = id;
		this.attributes = {
			name: value,
			completed: false
		};
	}
}

class TodoStore {
	@observable todos = [];
	@observable filter = '';
	@computed get filteredTodos() {
		const matchesFilter = new RegExp(this.filter, "i");
		return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.attributes.name));
	}
	
	createTodo(value, id) {
		this.todos = [...this.todos, new Todo(value, id)];
	}

	toggleCompleted(item) {
		this.todos.filter(todo => {
			if (todo.id !== item.id) {
				return this.todos;
			}
			return item.attributes.completed = !item.attributes.completed;
		});
	}

	clearCompleted = () => {
		const incompleted = this.todos.filter(todo => !todo.attributes.completed);
		this.todos.replace(incompleted);
	};

	deleteTodo(id) {
		const itemIndex = this.todos.findIndex(todo => todo.id === id);
		this.todos = [
			...this.todos.slice(0, itemIndex),
			...this.todos.slice(itemIndex + 1)
		]
	}

}

const store = new TodoStore;

export default store;
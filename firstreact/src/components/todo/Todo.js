import React, { Component } from 'react';
import TodoListTemplate from './TodoListTemplate';
import Form from './Form';
import TodoItemList from './TodoItemList';


class Todo extends Component {
  id = 3

  state = {
    input: '',
    todos: [
      {id: 0, text: ' 리엑트 소개', checked: false},
      {id: 1, text: ' 리엑트 소개', checked: true},
      {id: 2, text: ' 리엑트 소개', checked: false}
    ]
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }
  handleCreate = () => {
    const {input, todos} = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle}
        onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}


export default Todo;
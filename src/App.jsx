import { useState } from 'react'

function App() {
  // 任务列表
  const [tasks,setTasks] = useState([]);
  // 任务输入
  const [input,setInput] = useState('');

  // 添加任务
  const addTasks = () => {
    if (input.trim() === ''){
      return;
    }

    setTasks([...tasks,input]);
    setInput('');
  }
  return (
    <div className="App"> 
      <h1>Todo List</h1>

      <input 
        type = "text"
        placeholder = "添加待办任务..."
        value = {input}
        onChange = {(e) => setInput(e.target.value)}
      />
      <button onClick = {addTasks}>添加</button>

      <ul> 
        {tasks.map((task,index) => (
          <li key = {index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App

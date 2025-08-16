import { useState } from 'react'

// 定义任务类型
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function App() {
  // 任务列表/输入
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // 添加任务
  const addTasks = () => {
    if (input.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // 切换待办状态
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task,
          completed: !task.completed,
        } : task
      )
    );
  };

  // 删除任务
  const deleteTask=(id:number)=>{
    setTasks(tasks.filter(
      (task)=>task.id!==id
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="添加待办任务..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTasks} style={{ marginLeft: "8px" }}>
        添加
      </button>

      <ul>
        {tasks.map((task)=>(
          <li key={(task.id)} style={{margin:"8px 0"}}>
            <span 
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              {task.name}
            </span>
            <button onClick={()=>toggleTask(task.id)}>
              {task.completed ? "完成" : "未完成"}
            </button>
            <button 
                onClick={()=>deleteTask(task.id)} 
                style={{ marginLeft: "6px", color: "red" }}
              >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

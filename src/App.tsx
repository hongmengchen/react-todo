import { useState } from "react";

// 定义任务类型
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // 添加任务
  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      name: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // 切换任务完成状态
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 删除任务
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px" ,maxWidth: "500px", margin: "0 auto"}}>
      <h1>Todo List</h1>

      {/* 输入框 + 按钮 */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入任务..."
      />
      <button onClick={addTask} style={{ marginLeft: "8px" }}>
        添加
      </button>

      {/* 渲染任务列表 */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: "8px 0", display: "flex", alignItems: "center" }}>
            {/* 复选框 */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: "8px" }}
            />

            {/* 任务名 */}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {task.name}
            </span>

            {/* 删除按钮 */}
            <button
              onClick={() => deleteTask(task.id)}
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

export default App;

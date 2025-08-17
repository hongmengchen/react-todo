import { useState } from "react";
import { MantineProvider, Button, TextInput } from '@mantine/core';
import "@mantine/core/styles.css";

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
    <MantineProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
              <img
                src="/todo.png"
                alt="Todo List"
                className="h-8 w-8 mr-3 text-indigo-600"
              />
              <span>Todo List</span>
            </h1>

            {/* 输入框 + 按钮 */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                任务名称
              </label>
              <div className="flex-1 flex gap-2">
                <TextInput
                  placeholder="输入任务..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1"
                />
                <Button
                  onClick={addTask}
                  color="indigo"
                >
                  添加
                </Button>
              </div>
            </div>

            {/* 渲染任务列表 */}
            {tasks.length > 0 ? (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    {/* 复选框 */}
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />

                    {/* 任务名 */}
                    <span
                      className={`ml-3 flex-1 ${task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                        }`}
                    >
                      {task.name}
                    </span>

                    {/* 删除按钮 */}
                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="subtle"
                      color="red"
                      className="ml-2 p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">还没有任务，添加一个新任务吧！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
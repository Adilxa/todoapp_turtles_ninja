import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import CompletedTasks from './pages/СompletedTasks.jsx';
import Layout from "./layouts/BaseLayout.jsx";
import AddTask from './pages/AddTask.jsx';
import RunningTasks from './pages/RunningTasks';
import { TaskProvider } from './context/TaskContext';
import { LayoutProvider } from './context/LayoutContext';

function App() {
    return (
        <TaskProvider>
            <LayoutProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/alltasks" element={<AllTasks />} />
                            <Route path="/completedtasks" element={<CompletedTasks />} />
                            <Route path="/runningtasks" element={<RunningTasks />} />
                            <Route path="/addTask" element={<AddTask />} />
                            <Route path="*" element={<div>404</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LayoutProvider>
        </TaskProvider>
    )
}

export default App;
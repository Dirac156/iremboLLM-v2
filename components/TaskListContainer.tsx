import React from "react";
import TaskListHeader from "./TaskListHeader";
// import TaskItem from "./TaskItem";
import { Task } from "@/lib/types";
import PaginatedTaskList from "./TaskItem";

interface TaskListContainerProps {
  tasks: Task[];
  intent: string;
  goal: string;
}

const TaskListContainer: React.FC<TaskListContainerProps> = ({
  tasks,
  intent,
  goal,
}) => {
  return (
    <div className="max-w-lg my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <TaskListHeader intent={intent} />
      <p className="text-slate-500">{goal}</p>
      <div id="tasks" className="my-5">
        <PaginatedTaskList tasks={tasks} />
        {/* {tasks.map((task) => (
          <PaginatedTaskList key={task.task_id} task={task} />
        ))} */}
      </div>
      <p className="text-xs text-slate-500 text-center">
        Last updated 1 minutes ago
      </p>
    </div>
  );
};

export default TaskListContainer;

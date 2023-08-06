import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DateTime } from "luxon";
import NewTask from "./NewTask/NewTask.jsx";
import LoadingPage from "../shared/loadingPage/loadingPage.jsx";
import TaskList from "./TaskList/TaskList.jsx";
import Calendar from "./TaskList/Calendar.jsx";
import ListsContext from "../context/lists-context.js";
import TasksContext from "../context/tasks-context.js";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./SingleListPage.css";

const date = DateTime.local(2023, 6, 10);

export const formattedDate = date.toLocaleString({
  month: "short",
  day: "numeric",
  year: "numeric",
});

function SingleListPage() {
  const { isLoading, setIsLoading } = useContext(ListsContext);

  const { tasks, setTasks, listName, setListName, calendarIsShown } =
    useContext(TasksContext);

  const { listId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/${listId}`
        );
        setTasks(response.data.listWithTasks.tasks);
        setListName(response.data.listWithTasks.name);
        setIsLoading(false);
      } catch (err) {}
    };
    fetchTasks();
  }, [listId]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div className="app">
          <header className="header">
            <div className="header__nav">
              <Link to="/" className="home-link">
                <IconButton>
                  <ArrowBackIosNewIcon fontSize="large" />
                </IconButton>
              </Link>
              <h1 className="title">{listName || "My Lists"}</h1>
            </div>
          </header>
          <NewTask />
          {calendarIsShown && <Calendar />}
          <TaskList />
        </div>
      )}
    </>
  );
}

export default SingleListPage;

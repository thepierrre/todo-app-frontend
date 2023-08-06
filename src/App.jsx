import axios from "axios";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ListsContext from "./context/lists-context";
import NewListMain from "./AllListsPage/NewListMain";
import MyListsMain from "./AllListsPage/MyListsMain";
import EditListModal from "./AllListsPage/EditListModal";
import LoadingPage from "./shared/loadingPage/LoadingPage";
import "./App.css";

const App = () => {
  const { lists, setLists, listToEditId, isLoading, setIsLoading } =
    useContext(ListsContext);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "https://mytodolists-62a4af294d6a.herokuapp.com/api/lists"
        );
        setLists(response.data.lists);
        setIsLoading(false);
      } catch (err) {}
    };
    fetchLists();
  }, []);

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div className="app">
          <div className="header">
            <h1 className="title">My to-do lists</h1>
          </div>
          <div className="mainpage-content">
            <NewListMain />
            <MyListsMain />
          </div>
          {listToEditId && <EditListModal />}
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;

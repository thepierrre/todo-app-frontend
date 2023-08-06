import SyncIcon from "@mui/icons-material/Sync";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <p>Loading...</p>
      <SyncIcon fontSize="large" />
    </div>
  );
};

export default LoadingPage;

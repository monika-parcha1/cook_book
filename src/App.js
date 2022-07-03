import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { paths, routes } from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component, id }) => {
          return <Route key={id} path={path} element={component} exact />;
        })}
        <Route path="/" element={<Navigate to={paths.RECIPES} />} />
      </Routes>
    </Router>
  );
}

export default App;

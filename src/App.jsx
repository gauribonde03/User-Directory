import { Routes, Route } from "react-router-dom";
import FetchData from "./FetchData";
import UserDetails from "./UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FetchData />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
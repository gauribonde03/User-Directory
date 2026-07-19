import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "./ThemeContext";

function FetchData() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("https://dummyjson.com/users?limit=10");
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">User Directory</h1>

          <div className="flex gap-8">
            <button
              onClick={fetchUsers}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>

            <button
              onClick={toggleTheme}
              className={`px-5 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-200 text-black"
                  : "bg-black text-white"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {loading && (
          <h2 className="text-center text-xl font-semibold">Loading Users...</h2>
        )}

        {error && (
          <h2 className="text-center text-red-500 font-semibold">{error}</h2>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className={`rounded-xl shadow-md p-5 hover:shadow-xl transition cursor-pointer hover:scale-105 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500"
                />

                <h2 className="text-xl font-bold text-center mt-4">
                  {user.firstName} {user.lastName}
                </h2>

                <p
                  className={`text-center ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {user.email}
                </p>

                <div
                  className={`mt-4 space-y-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <p>
                    <span className="font-semibold">Age:</span> {user.age}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span> {user.phone}
                  </p>

                  <p>
                    <span className="font-semibold">Gender:</span> {user.gender}
                  </p>

                  <p>
                    <span className="font-semibold">City:</span>{" "}
                    {user.address.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchData;
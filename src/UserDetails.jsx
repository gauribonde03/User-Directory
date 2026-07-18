import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">

        <img
          src={user.image}
          alt={user.firstName}
          className="w-40 h-40 rounded-full mx-auto border-4 border-blue-500"
        />

        <h1 className="text-3xl font-bold text-center mt-4">
          {user.firstName} {user.lastName}
        </h1>

        <div className="mt-6 space-y-3">

          <p>
            <strong>User ID:</strong> {user.id}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Age:</strong> {user.age}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>Gender:</strong> {user.gender}
          </p>

          <p>
            <strong>City:</strong> {user.address.city}
          </p>

          <p>
            <strong>Company:</strong> {user.company.name}
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}

export default UserDetails;
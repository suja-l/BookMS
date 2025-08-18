import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Modal } from "bootstrap";
import { SaveModal, CloseModal } from "./../../Components/Button";
// import { HandleLogout } from "./dashboard";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function HandleDashboard(navigate) {
//   navigate("../dashboard");
// }

function Database() {
  document.title = "User information";
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const tableStyle = {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
  };
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUser(storedUsers);
  }, []);
  const handleSaveEdit = () => {
    const { name, mobile, email, password } = editedUser;

    if (!name.trim()) {
      alert("Name cannot be empty");
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Number must be exactly 10 digits");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    const updatedUsers = [...user];
    updatedUsers[editIndex] = editedUser;
    setUser(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return true;
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmed) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      const updatedUser = [...user];
      updatedUser.splice(index, 1);
      setUser(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUser));
    }
  }; // let navigate = useNavigate();
  return (
    <>
      <div style={tableStyle}>
        {" "}
        <div className="container mt-5">
          <table className="table table-responsive table-striped table-dark table-hover table-borderless ">
            <caption className="caption-top">
              User Data Table
              <hr
                className="mx-auto ms-0 opacity-100 border-dark"
                style={{ width: "220px" }}
              />
            </caption>
            <thead className="table-warning">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Number</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Password</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={index} className="bg-white">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.mobile}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.password}</td>
                  <td className="p-2">
                    <button
                      className="btn btn-sm btn-warning ms-2"
                      onClick={() => {
                        setEditIndex(index);
                        setEditedUser(user);
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      edit{" "}
                    </button>

                    <button
                      className="btn btn-sm btn-danger ms-2"
                      style={{ color: "black" }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit user details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <input
                  className="form-control my-1"
                  placeholder="Name"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
                <input
                  className="form-control my-1"
                  placeholder="Number"
                  value={editedUser.mobile}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, mobile: e.target.value })
                  }
                />
                <input
                  className="form-control my-1"
                  placeholder="Email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
                <input
                  className="form-control my-1"
                  placeholder="Password"
                  value={editedUser.password}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, password: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <CloseModal color="btn-secondary" />
                <SaveModal
                  color="btn-primary"
                  onSaveClick={(e) => {
                    handleSaveEdit(e);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Database;

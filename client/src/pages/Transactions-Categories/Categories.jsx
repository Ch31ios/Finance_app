import "./Form.scss";

import Axios from "axios";
import { useEffect, useState } from "react";

import Menu from "../../components/Menu/Menu.jsx";

function CategoryManager() {

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Efecto para ocultar el mensaje de error o éxito después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(false);
        setErrorMsg("");
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Obtener usuario y categorías al cargar la página
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      Axios.post("http://localhost:3001/get-user", { username })
        .then(res => {
          if (res.data.id) {
            setUser(res.data);
            fetchCategories(res.data.id);
          }
        });
    }
  }, []);

  // Función para obtener categorías del usuario
  const fetchCategories = (user_id) => {
    Axios.post("http://localhost:3001/get-categories", { user_id })
      .then(res => {
        setCategories(res.data.categories || []);
      });
  };

  // Maneja el envío del formulario para agregar categoría
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!category) {
      setErrorMsg("Please enter a category");
      setError(true);
      setSuccess(false);
      return;
    }

    Axios.post("http://localhost:3001/add-category", {
      user_id: user.id,
      category
    })
      .then(res => {
        if (res.data.success) {
          setSuccess(true);
          setCategory("");
          fetchCategories(user.id);
        } else {
          setErrorMsg(res.data.error || "Error adding category");
          setError(true);
        }
      })
      .catch(() => {
        setErrorMsg("Connection error");
        setError(true);
      });
  };

  // Maneja la eliminación de una categoría
  const handleDeleteCategory = (id) => {
    if (!user) return;
    Axios.post("http://localhost:3001/delete-category", {
      id,
      user_id: user.id
    })
      .then(res => {
        if (res.data.success) {
          fetchCategories(user.id);
        } else {
          setErrorMsg("Error deleting category");
          setError(true);
        }
      })
      .catch(() => {
        setErrorMsg("Connection error");
        setError(true);
      });
  };

  // Renderiza el mensaje de error o éxito si existe
  const message = error ? (
    <span style={{ color: "#f23f43" }}>{errorMsg}</span>
  ) : success ? (
    <span style={{ color: "#2ecc40" }}>Category added</span>
  ) : null;

  return (
    <div className="form-container">

      <Menu />

      <div className="form-box">

        <h1>Category Manager</h1>

        <form className="form-main" onSubmit={handleAddCategory}>

          <div className="form-group">
            <label htmlFor="category">
              <span>New Category</span>{message}
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="form-button">Add</button>

        </form>

        <ul className="form-list">
          {categories.map(cat => (
            <li key={cat.id}>
              {cat.category}
              <button
                className="form-delete"
                onClick={() => handleDeleteCategory(cat.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default CategoryManager;

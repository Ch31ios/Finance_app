import "./Form.scss";

import Axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu.jsx";

function TransactionForm({ onSuccess }) {

  // Estados para los campos del formulario
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(""); // Empieza vacío
  const [category, setCategory] = useState(""); // Empieza vacío

  // Estados para mensajes de error y éxito
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Estado para el usuario y categorías
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

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
            // Obtener categorías del usuario
            Axios.post("http://localhost:3001/get-categories", { user_id: res.data.id })
              .then(catRes => {
                setCategories(catRes.data.categories || []);
              });
          }
        });
    }
  }, []);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Si algún campo está vacío, muestra mensaje de error
    if (!amount || !type || !category) {
      setErrorMsg("Please fill all fields");
      setError(true);
      setSuccess(false);
      return;
    }
    // Si el usuario no está cargado, muestra mensaje de error
    if (!user) {
      setErrorMsg("User not loaded");
      setError(true);
      setSuccess(false);
      return;
    }
    setError(false);
    setErrorMsg("");

    // Envía la transacción al backend
    Axios.post("http://localhost:3001/transaction", {
      user_id: user.id,
      username: user.username,
      amount,
      type,
      category
    })
      .then((res) => {
        // Si la transacción se guarda correctamente
        if (res.data.success) {
          setSuccess(true);
          setAmount("");
          setType("");
          setCategory("");
          if (onSuccess) onSuccess();
        } else {
          setErrorMsg("Error saving transaction");
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
    <span style={{ color: "#2ecc40" }}>Transaction saved</span>
  ) : null;

  return (
    <div className="form-container">

      <Menu />

      <div className="form-box">

        <h1>New Transaction</h1>

        <form className="form-main" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="amount">
              <span>Amount</span>{!amount && message}
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">
              <span>Type</span>
              {!type && message}
            </label>
            <select id="type" value={type} onChange={e => setType(e.target.value)}>
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <span>Category</span>
              {!category && message}
            </label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-button">Save</button>

        </form>
      </div>
    </div>
  );
}

export default TransactionForm;

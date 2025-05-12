import "./Analysis.scss";

import Menu from "../../components/Menu/Menu.jsx";

function Analysis() {
  const ingresos = [1000, 1200, 950];
  const gastosPorCategoria = {
    Alimentación: 300,
    Transporte: 150,
    Ocio: 100,
    Salud: 80,
  };

  const totalIngresos = ingresos.reduce((acc, val) => acc + val, 0);
  const gastos = Object.values(gastosPorCategoria);
  const totalGastos = gastos.reduce((acc, val) => acc + val, 0);
  const porcentajeAhorro = totalIngresos > 0 && (totalIngresos - totalGastos) > 0 ? ((totalIngresos - totalGastos) / totalIngresos) * 100 : 0;
  const promedioIngresos = ingresos.length > 0 ? totalIngresos / ingresos.length : 0;
  const promedioGastos = gastos.length > 0 ? totalGastos / gastos.length : 0;

  return (
    <div className="analysis">

      <Menu />

      <div className="analysis-container">

        <h2>Análisis de Ingresos y Gastos</h2>

        <div className="summary">
          <p>Promedio de ingresos: ${promedioIngresos}</p>
          <p>Promedio de gastos: ${promedioGastos}</p>
          <p>Porcentaje de ahorro: {porcentajeAhorro}%</p>
          <p>Relación ingresos/gastos: {totalIngresos - totalGastos}</p>
        </div>

        <h3>Gasto promedio por categoría</h3>

        <ul className="categorias">
          {Object.entries(gastosPorCategoria).map(([cat, val]) => (
            <li key={cat}>{cat}: ${val}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Analysis;

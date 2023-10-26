/*import React, { useState, useEffect } from "react";


export default function App() {
  const [col, setCol] = useState([]);
  const [row, setRow] = useState([]);

  const crearArreglo = (ncol, callbak) => {
    let r = [];
    for (let i = 0; i < ncol; i++) {
      r.push(i);
    }
    callbak(r);
  };

  useEffect(() => {
    crearArreglo(5, setCol);
    crearArreglo(5, setRow);
  }, []);

  return (
    <div className="App">
      <h1>Tablas dinamicas con React</h1>
      <p>Columnas</p>
      <input
        type="number"
        value={col.length}
        min="0"
        max="100"
        onChange={(e) => crearArreglo(e.target.value, setCol)}
      />
      <p>Filas</p>
      <input
        type="number"
        value={row.length}
        min="0"
        max="100"
        onChange={(e) => crearArreglo(e.target.value, setRow)}
      />
      <table>
        {col.length !== 0 ? col.map(() => <ColComp rows={row} />) : null}
      </table>
    </div>
  );
}
*/

import { predicatesList, predicates } from "./useQueryBuilder";

import { useState, useCallback } from "react";

export default function QueryForm({ queryArray }) {
  const initData = {
    predicate: "Email",
    operator: "equals",
    value1: "",
    value2: "",
  };
  const [rowDataArray, setRowDataArray] = useState([initData]);

  const handleInputChange = (i, e, val) => {
    const rowData = [...rowDataArray];
    rowData[i][val] = e.target.value;
    setRowDataArray(rowData);
  };

  const handleRemoveRow = (i) => {
    if (rowDataArray.length === 1) {
      setRowDataArray([initData]);
    } else {
      setRowDataArray((arr) => [...arr.filter((_, ind) => ind !== i)]);
    }
  };

  const handleAddRow = () => {
    setRowDataArray((arr) => [...arr, initData]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    queryArray(rowDataArray);
  };
  const handleReset = () => {
    setRowDataArray([initData]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row
        rowDataArray={rowDataArray}
        handleInputChange={handleInputChange}
        removeRow={handleRemoveRow}
      />
      <div>
        <button type="button" onClick={handleAddRow}>
          And
        </button>
      </div>
      <div>
        <button>Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export function Row({ rowDataArray, handleInputChange, removeRow }) {
  const isString = (p) => predicates[p].type === "string";
  const handleRemoveRow = (i) => removeRow(i);
  return (
    <>
      {rowDataArray.map((row, i) => (
        <div key={i} id={i}>
          <span>
            <button
              type="button"
              aria-label="Remove Row"
              onClick={() => handleRemoveRow(i)}
            >
              X
            </button>
          </span>
          <select
            value={row.predicate}
            onChange={(e) => handleInputChange(i, e, "predicate")}
          >
            {predicatesList.map((op, index) => (
              <option value={op} key={`${index}-${index}`}>
                {op}
              </option>
            ))}
          </select>
          {!isString(row.predicate) ? "is" : null}
          <select
            value={row.operator}
            onChange={(e) => handleInputChange(i, e, "operator")}
          >
            {predicates[row.predicate].operators().map((op, index) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>

          {isString(row.predicate) ? (
            <input
              type="text"
              value={row.value1}
              onChange={(e) => handleInputChange(i, e, "value1")}
            />
          ) : row.operator === "between" ? (
            <span>
              <input
                type="text"
                value={row.value1}
                onChange={(e) => handleInputChange(i, e, "value1")}
              />
              and
              <input
                type="text"
                value={row.value2}
                onChange={(e) => handleInputChange(i, e, "value2")}
              />
            </span>
          ) : (
            <input
              type="text"
              value={row.value1}
              onChange={(e) => handleInputChange(i, e, "value1")}
            />
          )}
        </div>
      ))}
    </>
  );
}

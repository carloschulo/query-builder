import "./styles.css";
import buildQuery, {
  getNumberOperators,
  getStringOperators,
  predicatesList,
  predicates,
  TABLE,
} from "./useQueryBuilder";

import { useState, useCallback } from "react";

export function Row(props) {
  const [rowDataArray, setRowDataArray] = useState([
    {
      predicate: "Email",
      operator: "equal",
      value1: "",
      value2: "",
    },
  ]);
  console.log("rowdata", rowDataArray);

  const handleSelectChange = (i, e) => {
    const rowData = [...rowDataArray];
    rowData[i].predicate = e.target.value;
    setRowDataArray(rowData);
  };
  const handleSelectChangeOperator = (i, e) => {
    const rowData = [...rowDataArray];
    rowData[i].operator = e.target.value;
    setRowDataArray(rowData);
  };

  const handleInputChange = (i, e, val) => {
    const rowData = [...rowDataArray];
    rowData[i][val] = e.target.value;
    setRowDataArray(rowData);
  };

  const isString = (p) => predicates[p].type === "string";

  const handleRemoveRow = (i) => {
    setRowDataArray((arr) => [...arr.filter((_, ind) => ind !== i)]);
  };

  const handleAddRow = () => {
    setRowDataArray((arr) => [
      ...arr,
      {
        predicate: "Email",
        operator: "equal",
        value1: "",
        value2: "",
      },
    ]);
  };
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
            onChange={(e) => handleSelectChange(i, e)}
          >
            {predicatesList.map((op, index) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
          {!isString(row.predicate) ? "is" : null}
          <select
            value={row.operator}
            onChange={(e) => handleSelectChangeOperator(i, e)}
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
      <div>
        <button type="button" onClick={handleAddRow}>
          And
        </button>
      </div>
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState([""]);
  const [queryOptions, setQueryOptions] = useState({
    predicate: "",
    operator: "",
    value1: "",
    value2: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // const q = buildQuery(
    //   queryOptions.predicate,
    //   queryOptions.operator,
    //   queryOptions.value1,
    //   queryOptions.value2
    // );
    // setQuery([...query, q]);
    const select = `SELECT * FROM ${TABLE}`;
    const finalQuery = select.concat(" ", query.join(" AND ")) || "";
    console.log(finalQuery);
  };

  const updateQueryOptions = (opts) => {
    console.log("options are", opts);
  };

  // const handleAddRow = () => {
  //   setQuery([...query, ""]);
  // };

  const handleRemoveRow = (i) => {
    setQuery((arr) => [...arr.filter((_, ind) => ind !== i)]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Row
          updateQueryList={updateQueryOptions}
          removeRow={handleRemoveRow}
          queryList={query}
        />
        {/* <div>
          <button type="button" onClick={handleAddRow}>
            And
          </button>
        </div> */}
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

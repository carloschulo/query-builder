import "./styles.css";
import buildQuery, {
  getNumberOperators,
  getStringOperators,
  predicatesList,
  predicates,
  TABLE,
} from "./useQueryBuilder";

import { useState, useCallback } from "react";
const initRowState = [
  {
    predicate: "Email",
    operator: "equal",
    value1: "",
    value2: "",
  },
];

export function Row(props) {
  const [predicate, setPredicate] = useState("Email");
  const [operator, setOperator] = useState("equals");
  const [rowDataArray, setRowDataArray] = useState(initRowState);

  // inputs
  const [value1, setValue1] = useState("");
  const [numValState, setNumValState] = useState({
    numVal1: "",
    numVal2: "",
  });

  const handleSelectChange = (i, e) => {
    const rowData = [...rowDataArray];
    rowData[i].predicate = e.target.value;
    console.log("please", rowData);
    setRowDataArray(rowData);
  };
  const handleSelectChangeOperator = (i, e) => {
    const rowData = [...rowDataArray];
    rowData[i].operator = e.target.value;
    console.log("please", rowData);
    setRowDataArray(rowData);
  };

  const isString = predicates[predicate].type === "string";

  const handleRemoveRow = (i) => {
    setRowDataArray((arr) => [...arr.filter((_, ind) => ind !== i)]);
  };

  // TODO: add row
  const handleAddRow = () => {
    setRowDataArray((arr) => [...arr, initRowState]);
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
          {!isString ? "is" : null}
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

          {isString ? (
            <input
              type="text"
              value={row.value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          ) : operator === "between" ? (
            <span>
              <input
                type="text"
                value={row.value1}
                onChange={(e) =>
                  setNumValState({ ...numValState, numVal1: e.target.value })
                }
              />{" "}
              and{" "}
              <input
                type="text"
                value={row.value2}
                onChange={(e) =>
                  setNumValState({ ...numValState, numVal2: e.target.value })
                }
              />
            </span>
          ) : (
            <input
              type="text"
              value={row.value1}
              onChange={(e) =>
                setNumValState({ ...numValState, numVal1: e.target.value })
              }
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

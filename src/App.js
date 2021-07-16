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
  const [predicate, setPredicate] = useState("Email");
  const [operator, setOperator] = useState("equals");

  // inputs
  const [value1, setValue1] = useState("");
  const [numValState, setNumValState] = useState({
    numVal1: "",
    numVal2: "",
  });

  const handleSelectChange = useCallback(
    (e) => {
      setPredicate(e.target.value);
    },
    [setPredicate]
  );
  const handleSelect2Change = useCallback(
    (e) => {
      setOperator(e.target.value);
    },
    [setOperator]
  );

  const isString = predicates[predicate].type === "string";

  const handleRemoveRow = () => {
    props.removeRow(props.rowIndex);
  };
  return (
    <div>
      <span>
        <button type="button" aria-label="Remove Row" onClick={handleRemoveRow}>
          X
        </button>
      </span>
      <select value={predicate} onChange={handleSelectChange}>
        {predicatesList.map((op, index) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </select>
      {!isString ? "is" : null}
      <select value={operator} onChange={handleSelect2Change}>
        {predicates[predicate].operators().map((op, index) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </select>

      {isString ? (
        <input
          type="text"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      ) : operator === "between" ? (
        <span>
          <input
            type="text"
            value={numValState.numVal1}
            onChange={(e) =>
              setNumValState({ ...numValState, numVal1: e.target.value })
            }
          />{" "}
          and{" "}
          <input
            type="text"
            value={numValState.numVal2}
            onChange={(e) =>
              setNumValState({ ...numValState, numVal2: e.target.value })
            }
          />
        </span>
      ) : (
        <input
          type="text"
          value={numValState.numVal1}
          onChange={(e) =>
            setNumValState({ ...numValState, numVal1: e.target.value })
          }
        />
      )}
    </div>
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
    const q = buildQuery(
      queryOptions.predicate,
      queryOptions.operator,
      queryOptions.value1,
      queryOptions.value2
    );
    setQuery([...query, q]);
    const select = `SELECT * FROM ${TABLE}`;
    const finalQuery = select.concat(" ", query.join(" AND ")) || "";
    console.log(finalQuery);
  };

  const updateQueryOptions = (opts) => {
    console.log("options are", opts);
  };

  console.log("how many rows", query);
  const handleAddRow = () => {
    setQuery([...query, ""]);
  };

  const handleRemoveRow = (index) => {
    console.log("remove index", index);
    setQuery([...query.splice(index, 1)]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {query.map((q, i) => (
          <Row
            key={i}
            updateQueryList={updateQueryOptions}
            rowIndex={i}
            removeRow={handleRemoveRow}
          />
        ))}
        <div>
          <button type="button" onClick={handleAddRow}>
            Add
          </button>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

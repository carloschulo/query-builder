import "./styles.css";
import buildQuery, {
  getNumberOperators,
  getStringOperators,
  predicatesList,
  predicates,
} from "./useQueryBuilder";

import { useState } from "react";

export default function App() {
  const [select, setSelect] = useState("Email");
  const [select2, setSelect2] = useState(select);

  const [value1, setValue1] = useState("");
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };
  const handleSelect2Change = (e) => {
    setSelect2(e.target.value);
  };
  return (
    <div className="App">
      <div>{console.log(predicates[select])}</div>
      <select value={select} onChange={handleSelectChange}>
        {predicatesList.map((op, index) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </select>
      {select ? (
        <select value={select2} onChange={handleSelect2Change}>
          {predicates[select].operators().map((op, index) => (
            <option value={op} key={op}>
              {op}
            </option>
          ))}
        </select>
      ) : null}
      {predicates[select].type === "string" ? (
        <input
          type="text"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      ) : null}
      <div>{buildQuery(select, select2, value1)}</div>
    </div>
  );
}

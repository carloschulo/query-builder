import "./styles.css";
import buildQuery, { TABLE } from "./useQueryBuilder";
import QueryForm from "./QueryForm";
import { useState } from "react";

export default function App() {
  const [queryString, setQueryString] = useState("");
  const handleBuildQueryString = (array) => {
    const queryStringArray = array.map(
      ({ predicate, operator, value1, value2 }) => {
        const a = buildQuery(predicate, operator, value1, value2);
        return a;
      }
    );
    const select = `SELECT * FROM ${TABLE}`;
    const finalQuery = select.concat(" ", queryStringArray.join(" AND ")) || "";
    setQueryString(finalQuery);
  };
  return (
    <div className="App">
      <QueryForm queryArray={handleBuildQueryString} />
      {queryString ? <div> {queryString} </div> : null}
    </div>
  );
}

import "./styles.css";
import buildQuery, { TABLE } from "./QueryBuilder";
import QueryForm from "./QueryForm";
import { useState } from "react";

export default function App() {
  const [queryString, setQueryString] = useState("");
  const formReset = () => {
    setQueryString("");
  };
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
      <QueryForm queryArray={handleBuildQueryString} formReset={formReset} />
      <div
        className="card w-100 m-stack-top-lg"
        style={{ textAlign: "center", fontStyle: "italic" }}
      >
        {queryString ? queryString : "Your generated SQL Statement goes here:"}
      </div>
    </div>
  );
}

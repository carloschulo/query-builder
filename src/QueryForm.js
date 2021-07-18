import { useState } from "react";
import Row from "./QueryRow";
import { MdSearch } from "react-icons/md";
import Button from "./components/Button";

export default function QueryForm({ queryArray, formReset }) {
  const initData = {
    predicate: "Email",
    operator: "equals",
    value1: "",
    value2: "",
  };
  const [rowDataArray, setRowDataArray] = useState([initData]);
  const handleInputChange = (i, e, val) => {
    setRowDataArray((prevRowData) =>
      prevRowData.map((item, index) => {
        return index === i ? { ...item, [val]: e.target.value } : item;
      })
    );
  };

  const handleRemoveRow = (i) => {
    if (rowDataArray.length === 1) {
      setRowDataArray([initData]);
      formReset();
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
    formReset();
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <Row
        rowDataArray={rowDataArray}
        handleInputChange={handleInputChange}
        removeRow={handleRemoveRow}
      />
      <div>
        <Button onClick={handleAddRow} className="m-stack-md button">
          And
        </Button>
      </div>
      <hr />
      <div>
        <Button buttonType="submit">
          <span style={{ verticalAlign: "inherit" }}>
            <MdSearch />
          </span>
          Submit
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </form>
  );
}

import { predicatesList, predicates } from "./QueryBuilder";
import { MdClose } from "react-icons/md";
import Button from "./components/Button";
import Field from "./components/InputField";

export default function Row({ rowDataArray, handleInputChange, removeRow }) {
  const isString = (p) => predicates[p].type === "string";
  const handleRemoveRow = (i) => removeRow(i);
  return (
    <>
      {rowDataArray.map((row, i) => (
        <div key={i} id={i} className="flex-row m-stack-md card">
          <span className="flex-inline-center">
            <Button
              transparent
              type="button"
              aria-label="Remove Row"
              onClick={() => handleRemoveRow(i)}
            >
              <MdClose />
            </Button>
          </span>
          <select
            className="input"
            value={row.predicate}
            onChange={(e) => handleInputChange(i, e, "predicate")}
          >
            {predicatesList.map((op, index) => (
              <option value={op} key={`${index}-${index}`}>
                {op}
              </option>
            ))}
          </select>
          {!isString(row.predicate) ? (
            <span className="m-inline-md p1 flex-inline-center">is</span>
          ) : null}
          <select
            className="input"
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
            <Field
              type="text"
              value={row.value1}
              onChange={(e) => handleInputChange(i, e, "value1")}
            />
          ) : row.operator === "between" ? (
            <span>
              <Field
                type="text"
                value={row.value1}
                onChange={(e) => handleInputChange(i, e, "value1")}
              />
              <span className="m-inline-md p1 flex-inline-center">and</span>
              <Field
                type="text"
                value={row.value2}
                onChange={(e) => handleInputChange(i, e, "value2")}
              />
            </span>
          ) : (
            <Field
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

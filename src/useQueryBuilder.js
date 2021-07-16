const TABLE = "session";

function getStringOperators(operator, columnName, value1, ...valueList) {
  const queryObject = {
    equals: `WHERE ${columnName} = ${value1}`,
    contains: `WHERE ${columnName} LIKE '%${value1}%'`,
    "starts with": `WHERE  LIKE '${value1}%'`,
    "in list": `WHERE ${columnName} IN (${valueList})`,
  };
  if (!arguments.length) {
    return Object.keys(queryObject);
  }
  return queryObject[operator];
}

function getNumberOperators(
  operator,
  columnName,
  value1,
  value2,
  ...valueList
) {
  const queryObject = {
    equals: `WHERE ${value1} = ${value2}`,
    between: `WHERE ${columnName} BETWEEN ${value1} AND ${value2}`,
    "greater than": `WHERE ${columnName} > ${value1}`,
    "less than": `WHERE ${columnName} < ${value1}`,
    "in list": `WHERE ${columnName} IN (${valueList})`,
  };

  if (!arguments.length) {
    return Object.keys(queryObject);
  }
  return queryObject[operator];
}

const predicates = {
  Email: {
    column: "user_email",
    operators: getStringOperators,
    type: "string",
  },
  "Screen Width": {
    column: "screen_width",
    operators: getNumberOperators,
    type: "number",
  },
  "Screen Height": {
    column: "screen_height",
    operators: getNumberOperators,
    type: "number",
  },
  "# of Visits": {
    column: "visits",
    operators: getNumberOperators,
    type: "number",
  },
  "First Name": {
    column: "user_first_name",
    operators: getStringOperators,
    type: "string",
  },
  "Last Name": {
    column: "user_last_name",
    operators: getStringOperators,
    type: "string",
  },
  "Page Response time (ms)": {
    column: "page_response",
    operators: getNumberOperators,
    type: "number",
  },
  Domain: { column: "domain", operators: getStringOperators, type: "string" },
  "Page Path": {
    column: "path",
    operators: getStringOperators,
    type: "string",
  },
  Id: { column: "id", operators: getNumberOperators, type: "number" },
};

const predicatesList = Object.keys(predicates);

export default function buildQuery(
  predicate,
  operator,
  value1,
  value2,
  valueList
) {
  const criteriaList = [];
  criteriaList.push(
    predicates[predicate].operators(
      operator,
      predicates[predicate].column,
      value1,
      value2,
      valueList
    )
  );

  // const setCriteriaList = (predicate, operator, value1, value2, valueList) => {
  //   criteriaList.push(
  //     predicates[predicate].operators(
  //       operator,
  //       predicates[predicate].column,
  //       value1,
  //       value2,
  //       valueList
  //     )
  //   );
  // };

  // setCriteriaList("Email", "equals", 1, 1);
  // setCriteriaList("Screen Width", "greater than", 10);
  // setCriteriaList("Screen Width", "in list", null, null, [1, 2, 3, 4]);
  // console.log(getNumberOperators());
  // console.log(getStringOperators());

  const select = `SELECT * FROM ${TABLE}`;
  const finalQuery = select.concat(" ", criteriaList.join(" AND ")) || "";
  return finalQuery;
}

export { getNumberOperators, getStringOperators, predicatesList, predicates };

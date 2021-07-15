const TABLE = "session";

function getStringOperators(
  operator,
  columnName,
  value1,
  value2,
  ...valueList
) {
  const queryObject = {
    equals: `WHERE ${value1} = ${value2}`,
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
  Email: { column: "user_email", operators: getStringOperators },
  "Screen Width": { column: "screen_width", operators: getNumberOperators },
  "Screen Height": { column: "screen_height", operators: getNumberOperators },
  "# of Visits": { column: "visits", operators: getNumberOperators },
  "First Name": { column: "user_first_name", operators: getStringOperators },
  "Last Name": { column: "user_last_name", operators: getStringOperators },
  "Page Response time (ms)": {
    column: "page_response",
    operators: getNumberOperators,
  },
  Domain: { column: "domain", operators: getStringOperators },
  "Page Path": { column: "path", operators: getStringOperators },
  Id: { column: "id", operators: getNumberOperators },
};

const criteriaList = [];

const setCriteriaList = (predicate, operator, value1, value2, valueList) => {
  criteriaList.push(
    predicates[predicate].operators(
      operator,
      predicates[predicate].column,
      value1,
      value2,
      valueList
    )
  );
};

setCriteriaList("Email", "equals", 1, 1);
setCriteriaList("Screen Width", "greater than", 10);
setCriteriaList("Screen Width", "in list", null, null, [1, 2, 3, 4]);
// console.log(getNumberOperators());
// console.log(getStringOperators());

const select = `SELECT * from ${TABLE}`;
criteriaList;
const finalQuery = select.concat(" " ,criteriaList.join(" AND "));
finalQuery;

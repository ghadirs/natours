module.exports = (body) => {
  let key = Object.keys(body);
  let value = Object.values(body);
  let query = "";

  for (i = 0; i < key.length; i++) {
    if (i > 0) {
      if (typeof value[i] === "string") query += `,${key[i]} = '${value[i]}'`;
      if (typeof value[i] === "number") query += `,${key[i]} = ${value[i]}`;
      if (typeof value[i] === "object") query += `,${key[i]} = '${value[i]}'`;
    } else {
      query += `${key[i]} = '${value[i]}'`;
    }
  }
  return query;
};

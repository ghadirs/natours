module.exports = (req, res) => {
  // prettier-ignore
  let query = '';
  let value = Object.values(req.body);
  let key = Object.keys(req.body);
  let cutPW = key.indexOf("pass");
  key.splice(cutPW, 1);

  for (i = 0; i < key.length - 1; i++) {
    query += `"${key[i]}" : "${value[i]}",`;
  }
  query += `"${key[key.length - 1]}" : "${value[key.length - 1]}"`;
  return query;
};

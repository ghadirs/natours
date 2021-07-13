module.exports = (request) => {
  let isJson = false;
  if (request.headers["content-type"] === "application/json") isJson = true;
  return isJson;
};

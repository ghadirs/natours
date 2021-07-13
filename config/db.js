const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "nodetut",
});

client.connect((err, result) => {
  if (err) return console.log(err);
  if (result) {
    return console.log(result);
  }
});

module.exports = client;

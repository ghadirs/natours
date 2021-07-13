const db = require("../config/db");

module.exports = class Model {
  constructor() {
    this.id = "";
    this.password = "";
    this.passwordResetToken = "";
    this.passwordResetExpires = "";
    this.table = "";
    this.queryQM = "";
    this.columns = "";
    this.error = "";
    this.result = "";
    this.order_by = "";
    this.condition = "";
    this.limit = "";
    this.json = "";
  }

  async select() {
    let query = `SELECT * FROM ${this.table}`;
    if (this.condition) query += ` WHERE id = ${this.condition}`;
    if (this.columns) query += `(${this.columns})`;
    await db
      .execute(query)
      .catch((e) => {
        this.error = e;
      })
      .then((s) => {
        this.result = s;
      });
    return this.error || this.result.rows;
  }

  async add() {
    let query = `INSERT INTO ${this.table} (${this.columns}) VALUES () `;
    if (this.json === true) {
      query = `INSERT INTO ${this.table} JSON '{"id" : "${this.id}", "pass" : "${this.password}", ${this.queryQM}}'`;
    }
    await db
      .execute(query)
      .catch((e) => {
        this.error = e;
      })
      .then((s) => {
        this.result = s;
      });
    return (
      this.error || Array(JSON.stringify(this.result), JSON.stringify(this.id))
    );
  }

  async insert(values) {
    console.log(values);
    let query = `UPDATE ${this.table} SET ${values} `;
    if (this.condition) query += `WHERE id = ${this.condition}`;
    await db
      .execute(query)
      .catch((e) => {
        this.error = e;
      })
      .then((s) => {
        this.result = s;
      });
    return this.error || { status: "true" };
  }

  async remove() {
    let query = `DELETE ${this.columns} FROM ${this.table}`;
    if (this.condition) query += ` WHERE id = ${this.condition}`;
    await db
      .execute(query)
      .catch((e) => {
        this.error = e;
      })
      .then((s) => {
        this.result = s;
      });
    return this.error || { status: "true" };
  }
};

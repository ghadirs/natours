const Model = require("../system/Model");

module.exports = class Tours extends Model {
  constructor() {
    super();
    this.id = "";
    this.table = "tours";
    this.columns = "";
    this.condition = "";
    this.limit = "";
    this.json = "";
    this.queryQM = "";
    this.save = async () => {
      return await this.add();
    };
    this.getAll = async (next) => {
      return await this.select();
    };
    this.update = async (values) => {
      console.log(values);
      return await this.insert(values);
    };
    this.delete = async () => {
      return await this.remove();
    };
  }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Connection {
    constructor(option) {
        try {
            this._sequelize = new sequelize_1.Sequelize(option.database, option.username, option.password, option.option);
        }
        catch (err) {
            throw err;
        }
    }
    get sequelize() {
        return this._sequelize;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map
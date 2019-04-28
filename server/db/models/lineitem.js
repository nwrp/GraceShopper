const conn = require('../db');
const Sequelize = require('sequelize');

const LineItem = conn.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    orderPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    netTotalCost: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = LineItem;
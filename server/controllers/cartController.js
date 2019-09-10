const swag = require('../models/swag');

let add = (req, res) => {
    const { id } = req.params;
    let { user } = req.session;

    const index = user.cart.findIndex(swag => swag.id == id);

    if (index === -1) {
        const selectedSwag = swag.find(swag => swag.id == id);
        user.cart.push(selectedSwag);
        user.total += selectedSwag.price;
    }

    res.status(200).json(user);
}

let deleteItem = (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    const index = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (index !== -1) {
      user.cart.splice(index, 1);
      user.total -= selectedSwag.price;
    }

    res.status(200).json(user);
}

let checkout = (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).json(user);
}

module.exports = {
    add,
    deleteItem,
    checkout
}
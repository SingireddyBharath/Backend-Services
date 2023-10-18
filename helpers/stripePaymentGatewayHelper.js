const stripe = require('stripe')('sk_test_51HToqZKRFQR6bIVdufTuXrn7tnc9jfh4QrwvqVZZf2Ena7SJsYk4231A3DTMcJ5B7NgbpdmTt1h4AjJnIFPSU1RY009Ktd0EUn');
let config = require('../config.json');

function chargeCustomer(req, res) {
    return stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken,
        address: {
            line1: 'Ft 101 DSNR',
            postal_code: '500060',
            city: 'Hyderabad',
            state: 'Telangana',
            country: 'India',
        }
    }).then(customer => stripe.charges.create({
        amount: req.body.amount * 100,
        currency: "INR",
        customer: customer.id,
        description: req.body.description
    })).then((result) => {
        res.redirect(config.app.url + config.app.apiPrefix + "/korePaymentGateway/completed.html");
        return result.id;
    });
}

module.exports ={
    chargeCustomer
}
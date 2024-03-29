const express = require("express")
const coinbase = require('coinbase-commerce-node');

// Coinbase setup
const Client = coinbase.Client;
Client.init(process.env.API_KEY);
const Charge = coinbase.resources.Charge;


const Charges = async (req, res) => {
	let chargeData = {
		name: req.body.name,
		description: req.body.description,
		local_price: {
			amount: req.body.amount,
			currency: 'USD'
		},
		pricing_type: 'fixed_price'
	}

	Charge.create(chargeData, (err, response) => {
		if (err) {
			res.status(400).send({message: err.message});
		} else {
			res.status(200).send(response);
		}
	});
};


const Status = (req, res) => {
	let id = req.body.id;
	Charge.retrieve(id, (err, charge) => {
		console.log(charge);
		if(charge['timeline'][0]['status'] == 'NEW') {
			try {
				if (charge['timeline'][1]['status'] == 'PEDNING' && charge['timeline'].length == 2) {
					return res.status(200).send({message: 'Payment pending, awaiting confirmations.'});
				} else if (charge['timeline'][1]['status'] == 'EXPIRED') {
					return res.status(400).send({message: 'Payment expired'});
				} else if(charge['timeline'][2]['status'] == 'COMPLETED') {
					return res.status(200).send({message: 'Payment completed.'});
				}
			} catch(err) {
				return res.status(200).send({message: 'No payment detected'});
			}
		} else {
			return res.status(400).send({message: 'Charge not found.'});
		}
	});
};



module.exports = { Charges, Status }
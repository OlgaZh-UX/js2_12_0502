let express = require('express')
let fs = require('fs')
let server = express()

server.use (express.json())

let cart = require('./cart')
let writer = require('./writer')

server.get('/catalog', (req, res) => {
	fs.readFile('./server/dataBase/catalog.json', 'UTF-8', (err, data) => {
		if(!err) {
			res.send(data)
		} else {
			res.sendStatus(404)
		}
	})
})

server.get('/cart', (req, res) => {
	fs.readFile('./server/dataBase/cart.json', 'UTF-8', (err, data) => {
		if(!err) {
			res.send(data)
		} else {
			res.sendStatus(404)
		}
	})
})

server.post('/cart', (req, res) => {
	let path = './server/dataBase/cart.json'
	fs.readFile(path, 'UTF-8', (err, data) => {
		if(!err) {
			let {newCart, name} = cart.add(req, JSON.parse(data))
			writer(path, JSON.stringify(newCart, null, ' '), res, {action: 'add', name: name})
		} else {
			res.sendStatus(500)
		}
	})
})
server.put('/cart/:id', (req, res) => {
	let path = './server/dataBase/cart.json'
	fs.readFile(path, 'UTF-8', (err, data) => {
		if(!err) {
			let {newCart, name} = cart.change(req, JSON.parse(data))
			writer(path, JSON.stringify(newCart, null, ' '), res, {action: 'change', name: name})
		} else {
			res.sendStatus(500)
		}
	})
})
server.delete('/cart/:id', (req, res) => {
	let path = './server/dataBase/cart.json'
	fs.readFile(path, 'UTF-8', (err, data) => {
		if(!err) {
			let {newCart, name} = cart.delete(req, JSON.parse(data))
			writer(path, JSON.stringify(newCart, null, ' '), res, {action: 'del', name: name})
		} else {
			res.sendStatus(500)
		}
	})
})

server.listen(8080, () => { console.log('server is ON @ 8080') })
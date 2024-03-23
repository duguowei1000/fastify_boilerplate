'use strict'
import Fastify from 'fastify'
// import dbConnector from './our-db-connector.js'
// import firstRoute from './our-first-route.js'
import { itemRoutes } from './routes/routeitems.js'
//
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import path from 'path';

import jsonParser from 'fast-json-body'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fastify = Fastify({
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync( path.join(__dirname, '..','sslCERTS', 'fastify_certificates','fastify.key')),
    cert: fs.readFileSync( path.join(__dirname, '..','sslCERTS', 'fastify_certificates','fastify.crt'))
    // key: fs.readFileSync( './certificates/fastify.key'),
    // cert: fs.readFileSync( './certificates/fastify.crt')
  },
  logger: true,
})

// fastify.register(require('fastify-swagger'), {
//     exposeRoute: true,
//     routePrefix: '/docs',
//     swagger: {
//       info: { title: 'fastify-api' },
//     },
//   })
fastify.register(itemRoutes)
// testadd()
// CommonJs
// fastify.register(dbConnector)
// fastify.register(firstRoute)

// let items = [
//   {id: '1', name: 'item one'},
//   {id: '2', name: 'item two'},
//   {id: '3', name: 'item three'}
// ]
// // Declare a route
// fastify.get('/items', (req,reply)=>{
//     reply.send({items})
// })
// fastify.get('/items/:id', (req,reply)=>{
//     const {id} = req.params
//     const item = items.find(item => item.id === id)
//     reply.send({item})
// })

// fastify.post('/items', (req,reply) =>{
//     addItem()
// })

// const addItem = () => {
//     // console.log("items",items)
//     // let {name} = req.body
//     console.log("...items",...items)
//     let item = {id:1, name:"new here"}
//     items.push(item)
//     console.log("items",items)
//     // reply.code(201).send(item)
// }
// addItem()

fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsonParser(payload, function (err, body) {
    done(err, body)
  })
})
// remove default json parser
fastify.removeContentTypeParser('application/json')

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

////

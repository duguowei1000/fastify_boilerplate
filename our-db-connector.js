import * as dotenv from "dotenv";
dotenv.config();
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

console.log('mongourl', process.env.MONGO_URI)
/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: process.env.MONGO_URI
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)  
// module.exports = fastifyPlugin(dbConnector)  
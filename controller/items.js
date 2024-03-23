
import pkg from 'uuidv4';
import {items} from '../Items.js'
const { v4 } = pkg;

const getItems = (req, reply) => {
    reply.send(items)
  }
  
  const getItem = (req, reply) => {
    const { id } = req.params
  
    const item = items.find((item) => item.id === id)
  
    reply.send(item)
  }
  
  const deleteItem = (req, reply) => {
    const { id } = req.params
  
    items = items.filter((item) => item.id !== id)
  
    reply.send({ message: `Item ${id} has been removed` })
  }
  
  const updateItem = (req, reply) => {
    const { id } = req.params
    const { name } = req.body
  
    items = items.map((item) => (item.id === id ? { id, name } : item))
  
    item = items.find((item) => item.id === id)
  
    reply.send(item)
  }

const addItem = (req,reply) => {
    console.log("items",items)
    let {name} = req.body
    console.log("name",name)
    let item = {
        id: v4,
        name
    }
    
    console.log("...items",...items, ">>>item", item)

    // items = [ ...items,item] //cant use this as export "let" variable will be imported as const (immutable)
    items.push(item)
    console.log("items",items)
    reply.code(201).send(items)
}

// const testadd = () =>{
//     const add = {
//         id: uuid(),
//         name: "testname"
//     }

//     items = [ ...items,add]
// }


export { getItems,getItem, addItem, deleteItem, updateItem}


//https://stackoverflow.com/questions/48168601/change-the-value-of-imported-variable-in-es6
const express = require("express");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const { generateDueDate, generateUniqueId } = require("./utils");


const PORT = 4000;

const server = express();

server.use(express.json());

server.post("/todo/add", (req, res)=>{

    const { name, tags } = req.body;

    const todo_obj = {
        id : generateUniqueId(), 
        name,
        tags,
        due_date : generateDueDate(),
        is_completed : false
    }

    const DATA_PATH = path.join("data", "todo.json");

    const TODO_DATA = JSON.parse(fs.readFileSync(DATA_PATH, {encoding: "utf-8"}));

    TODO_DATA.push(todo_obj);

    fs.writeFileSync(DATA_PATH, JSON.stringify(TODO_DATA));

    res.status(httpStatus.CREATED).json({
        message : "New TODO is added",
        data : todo_obj
    })

})

server.get("/todos", (req, res)=>{

    const DATA_PATH = path.join("data", "todo.json");

    const TODO_DATA = JSON.parse(fs.readFileSync(DATA_PATH, {encoding: "utf-8"}));

    res.status(httpStatus.OK).json({
        message : TODO_DATA.length + " TODOS found",
        data : TODO_DATA
    })

})
// {
//   "message": "1 TODOS found",
//   "data": [
//       {
//           "id": "T9XqqfXYh43NYAJp",
//           "name": "Have to attempt weekly test",
//           "tags": [
//               "Study"
//           ],
//           "due_date": "2024-05-06T15:38:13.274Z",
//           "is_completed": false
//       }
//   ]
// }

server.put("/todo/update", (req, res)=>{
  const { id } = req.query;
  console.log(id);
  const DATA_PATH = path.join("data", "todo.json");

  const TODO_DATA = JSON.parse(fs.readFileSync(DATA_PATH, {encoding: "utf-8"}));

  const UPDATED_DATA = TODO_DATA.map((elem)=>{
    if(elem.id===id){
      elem.is_completed = true;
    }
    return elem;
  });
  
  console.log(UPDATED_DATA);
  fs.writeFileSync(DATA_PATH, JSON.stringify(UPDATED_DATA, null, '\t'));

  res.status(httpStatus.ACCEPTED).json({
    message : "Task Marked as Completed !"
})
})

server.delete("/todo/delete", (req, res)=>{    
    
    const { id } = req.query;

    const DATA_PATH = path.join("data", "todo.json");

    const TODO_DATA = JSON.parse(fs.readFileSync(DATA_PATH, {encoding: "utf-8"}));

    const UPDATED_DATA = TODO_DATA.filter((elem)=>elem.id!==id)

    fs.writeFileSync(DATA_PATH, JSON.stringify(UPDATED_DATA));

    res.status(httpStatus.ACCEPTED).json({
        message: "TODO is deleted"
    })

})

server.use("/*", (request, response)=>{
    // console.log(request.query)
    response.status(httpStatus.NOT_FOUND).json({
        message : "API Endpoint is not handled"
    })
})

server.listen(PORT, ()=>{
    console.log("Server is started at port "+PORT)
})


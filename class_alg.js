var todos = require("./fa17.json").todos
var alasql = require("alasql")
const {SingularValueDecomposition, Matrix} = require("ml-matrix")

todos = alasql("SELECT DATE(due) as due, name, _class, time, importance FROM ? order by due", [todos])
todos_untouched = alasql("SELECT DATE(due) as due, name, _class, time, importance FROM ? order by due", [todos])

var sum_time = alasql("Select SUM(time) as time from ?", [todos]).map(object => object.time)
var sum_importance = alasql("Select SUM(importance) as importance from ?", [todos]).map(object => object.importance)

var final_results = {}
todos.forEach((todo, index) => {
    todos[index].urgency = (todos.length-1-index)/(((todos.length-1)*(todos.length)/2));
    todos[index].due = new Date(todo.due).toLocaleString()
    todos[index].time = todos[index].time/sum_time
    todos[index].importance = todos[index].importance/sum_importance
    todos[index].time_u = todos_untouched[index].time
})
var data_matrix = []

todos.forEach((todo) => {
    var todo_row = [];
    todo_row.push(todo.importance)
    todo_row.push(todo.time)
    todo_row.push(todo.urgency)
    data_matrix.push(todo_row)
})
// var data_matrix = console.log(alasql("SELECT _class, name FROM ?", [all]))

var data_matrix = new Matrix(data_matrix)
var final_data = data_matrix.mmul(new Matrix([
                            [.4],
                            [.1],
                            [.5]
                        ])).to1DArray()

final_data.forEach((data,index) => {
    todos[index].rating = data;
})

var orderd_work = alasql("Select name, _class, due, rating, time_u from ? order by rating desc", [todos]).map(object =>
    "> "
    + object._class + " " + object.name
    + "\n"
    + "  Time: " + object.time_u
    + "\n"
    + "  Due: " + object.due
    + "\n"
    + "  Rating: " + object.rating.toFixed(2)
    + "\n")

orderd_work.forEach(thing => console.log(thing))



// todos

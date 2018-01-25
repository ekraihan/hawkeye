var todos = require("./todo.json").todos
var alasql = require("alasql")
const {SingularValueDecomposition, Matrix} = require("ml-matrix")

function rate_dates(date_array){
    var diff_array = []

    date_array.forEach(date => {
        diff_array.push(date - new Date());
    })
    var sum_diffs = diff_array.reduce((total,num) => total+num);

    var rating_array = [];
    diff_array.forEach(diff => rating_array.push(sum_diffs/diff))

    var rating_sum = rating_array.reduce((total,num) => total+num);

    var stochastic_ratings = []
    rating_array.forEach(rating => stochastic_ratings.push(rating/rating_sum))

    return stochastic_ratings;
}

todos = alasql("SELECT DATE(due) as due, name, _class, time, importance FROM ?", [todos]);

var date_ratings = rate_dates(alasql("SELECT due from ?", [todos]).map(object => object.due));
todos_untouched = alasql("SELECT DATE(due) as due, name, _class, time, importance FROM ?", [todos])

var sum_time = alasql("Select SUM(time) as time from ?", [todos]).map(object => object.time)
var sum_importance = alasql("Select SUM(importance) as importance from ?", [todos]).map(object => object.importance)

var final_results = {}
todos.forEach((todo, index) => {
    todos[index].urgency = date_ratings[index];
    todos[index].due = new Date(todo.due).toLocaleString()
    todos[index].time = todos[index].time/sum_time
    todos[index].importance = todos[index].importance/sum_importance
    todos[index].time_u = todos_untouched[index].time
    if (new Date(todo.due) < new Date()) {
      console.log("***************************************************")
      console.log("Date in the past for \"" + todos[index]._class + " " + todos[index].name + "\"!!!")
      console.log("***************************************************")
      throw "Invalid Date";
    }
})
var data_matrix = []

todos.forEach((todo) => {
    var todo_row = [];
    todo_row.push(todo.importance)
    todo_row.push(todo.time)
    todo_row.push(todo.urgency)
    data_matrix.push(todo_row)
})

var data_matrix = new Matrix(data_matrix)
var final_data = data_matrix.mmul(new Matrix([
                            [.1],
                            [.4],
                            [.5]
                        ])).to1DArray()

final_data.forEach((data,index) => {
    todos[index].rating = data;
})

var orderd_work = alasql("Select name, _class, due, rating, time_u, importance from ? order by rating desc", [todos]).map(object =>
    "> "
    + object._class + " " + object.name
    + "\n"
    + "  Time: " + object.time_u
    + "\n"
    + "  Due: " + object.due
    + "\n"
    + "  Rating: " + object.rating.toFixed(4)
    + "\n").reverse()

orderd_work.forEach(thing => console.log(thing))



// todos

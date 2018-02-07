# Class Scheduler

1. run `npm install`
2. In `todo.json`, in the `todos` array, there is an example school assignment. Fill out this array with all your todos. The format of each todo is

  `_class`: Class Name<br>
  `name`: Name of Assignment<br>
  `due`: Due Date in the format 'YYYY MMM D HH:MM'<br>
  `time`: Estimated time to complete assignment<br>
  `importance`: Importance of assignment on a scale of 0 to 1<br>
3. Run `node class_alg` to run the algorithm. It will print out all your todos in the recommended schedule.

### 2 NOTES!!!
1. Its very important that you remove a todo once you have finished it. The algorithm takes all todos into account when calculating your schedule so any todos you leave will influence recommendations.
2. If you are ready to take a break on the first recommended todo, consider doing the next todo.

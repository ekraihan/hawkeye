# Hawkeye
Hawkeye is a class scheduler designed to help you know what tasks to complete next in your busy life. Here are the steps to get started.

1. run `npm install`
2. In `todo.json`, in the `todos` array, there is an example school assignment. Fill out this array with all your todos. The format of each todo is

  `_class`: Class Name<br>
  `name`: Name of Assignment<br>
  `due`: Due Date in the format 'YYYY MMM D HH:MM'<br>
  `time`: Estimated time (hours) to complete assignment<br>
  `importance`: Importance of assignment on a scale of 0 to 1<br>

3. Run `node class_alg` to run the algorithm. It will print out all your todos in the recommended schedule.

### 2 NOTES!!!
1. Its very important that you remove a todo once you have finished it. The algorithm takes all todos into account when calculating your schedule so any todos you leave will influence recommendations.
2. If you are ready to take a break on the first recommended todo, consider doing the next todo.

### Ideas
Track time taken
Machine learns how long specific items (paper, project, etc.) in a specific class
Specify prime times
Specify not study/work time
Rank courses, then rank tasks within course
Block out a traveling/no work time
Fit algorithm to client

Make it generic enough that user can specify criticalness/rank/importance by certain field eg (cost of a bid, desire to understand, etc.)

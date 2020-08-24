Greedy is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. So the problems where choosing locally optimal also leads to global solution are best fit for Greedy.

Remember Greedy Algorithms are just a type/ strategy of algorithm, they are just one of many forms algorithms may take - e.g.:

Some commonly-used techniques are:

Divide and conquer
Randomized algorithms
Greedy algorithms (This is not an algorithm, it is a technique.)
Dynamic programming

Where to use Greedy algorithms?

A problem must comprise these two components for a greedy algorithm to work:

It has optimal substructures. The optimal solution for the problem contains optimal solutions to the sub-problems.

It has a greedy property (hard to prove its correctness!). If you make a choice that seems the best at the moment and solve the remaining sub-problems later, you still reach an optimal solution. You will never have to reconsider your earlier choices.

Proving that a greedy solution is optimal is very hard - knowing cases where greedy algorithms are effective is important. But if you are just looking for a good enough option for a problem then a greedy algorithm can be an easy solution.

For example:

Activity Selection problem
Fractional Knapsack problem
Scheduling problem

Differences between DFS and BFS


Comparing BFS and DFS, the big advantage of DFS is that it has much lower memory requirements than BFS, because it’s not necessary to store all of the child pointers at each level. Depending on the data and what you are looking for, either DFS or BFS could be advantageous.

For example, given a family tree if one were looking for someone on the tree who’s still alive, then it would be safe to assume that person would be on the bottom of the tree. This means that a BFS would take a very long time to reach that last level. A DFS, however, would find the goal faster. But, if one were looking for a family member who died a very long time ago, then that person would be closer to the top of the tree. Then, a BFS would usually be faster than a DFS. So, the advantages of either vary depending on the data and what you’re looking for.

One more example is Facebook; Suggestion on Friends of Friends. We need immediate friends for suggestion where we can use BFS. May be finding the shortest path or detecting the cycle (using recursion) we can use DFS.

The breadth-first search has an interesting property: It first finds all the vertices that are one edge away from the starting point, then all the vertices that are two edges away, and so on. This is useful if you’re trying to find the shortest path from the starting vertex to a given vertex. You start a BFS, and when you find the specified vertex, you know the path you’ve traced so far is the shortest path to the node. If there were a shorter path, the BFS would have found it already.

Depth-first searches are often used in simulations of games (and game-like situations in the real world). In a typical game you can choose one of several possible actions. Each choice leads to further choices, each of which leads to further choices, and so on into an ever-expanding tree-shaped graph of possibilities.

For example in games like Chess, tic-tac-toe when you are deciding what move to make, you can mentally imagine a move, then your opponent’s possible responses, then your responses, and so on. You can decide what to do by seeing which move leads to the best outcome.

Only some paths in a game tree lead to your win. Some lead to a win by your opponent, when you reach such an ending, you must back up, or backtrack, to a previous node and try a different path. In this way you explore the tree until you find a path with a successful conclusion. Then you make the first move along this path.

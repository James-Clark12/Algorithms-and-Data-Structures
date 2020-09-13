
To solve a lot of problems using DFS you need to be confident using  a backtracking strategy. This article gives a good template for it:

https://leetcode.com/explore/learn/card/recursion-ii/472/backtracking/2654/

https://leetcode.com/explore/learn/card/recursion-ii/472/backtracking/2793/

And this is a good question to test it:

https://leetcode.com/problems/reconstruct-itinerary/

The key takeaway is don't create a new graph/ map to represent the state of affairs inside each function call - update your map before you go into the backtracking call,
if the path leads to a dead end, recurse up, ammend the change you made and recurse down again using one of your different options.

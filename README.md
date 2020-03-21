# Algorithms-and-Data-Structures

My implementations of various Algorithms using modern JavaScript.

Weak topics for me:

Rotating matrixes - CTCI - 1.8 - find this really hard

Rotation in string - CTCI - 1.9 - solution is unexpected

Run time of various amortised operations

** Need a radix sort implementation

** Recall that jump search algorithm and when it was useful for (searching when the end of an array is unkown)

** Need an external sort implementation && Memory based problems and powers of 2 - 10.6, 10.7, 10.8

** 

--------------------------------------------------------------------------------------------------------------------

These are the steps I take when approaching algorithmic type problems:
1. Listen to the question

What details are gven in the question - are there any that make this question unique or very precise -what are the implications of these details?- I write these implications down so they are at the front of my mind whilst tacking the question

Immediately consider what further details would impact your solution - e.g. if inspecting string uniqueness: is capitalisation important

2. Make an Example/ Test Case

If the Question doesn't come with an example test case then I make an example one. This test case should be small enough that I can walk it through in my head - but also sufficiently representative of inputs and not be a special case.
3. Write a Brute Force Solution

I sketch out a Brute Force solution to the problem. This both gives you somewhere to start when creating an optimal solution but also proves you are capable of giving some solution to the problem - not all candidates interviewing can do this. I give the time and space complexity for my Brute Force solution.
4. Optimise the Brute force solution

The first thing I do when optimising is to work out what Best Conceivable Run Time for a solution could be. For example, if a problem requires us to touch each element in an array then the run time can never be better than O(n). The Best Conceivable Run Time both tells us when we can stop optimising and what we should be aiming for when optimising.

There are a number of good methods for approaching optimization. One method I like is the 'BUD' framework. It's fairly simple. You look at your brute force solution and look for three things:

B - Bottlenecks - what is the time complexity of your algorithm? What part of the algorithm causes it to have that time complexity and can that part be improved? For example, if you have a nested for loop causing your solution to be O(n^2) - can you remove it?

U - Unnecessary work - are we doing any work unnecessarily? If so remove it.

D - Duplicated work - is any work being done more than once? If so, store the result of the work and access that store when you need the data again.

Another good heuristic for approaching optimization is to run through a list of Data Structures and consider their impact if they were applied. This is good not just for the whole problem but for the functions within the problem. Doing this outloud can be a good demonstration of knowledge in interviews.

A further heuristic is to consider how you would solve the problem if it was physicall present. For example, given a deck of sorted cards, how would you look for a 7. Something close to binary search is likely the answer.

5. Walk Through Your Solution

You should now have an optimised solution. Make sure to walk through it as bullet points or just outloud before you start writing pseudocode. Writing peudocode is slow so you need to check your solution is correct before writing it out.

This is also a suitable time to start thinking about edge cases and where you would put error checks in your code - (these error checks can just be dummy functions - it's the thought that counts).

Finally think about how you can modularise your code to make it as readable and simple as possible

6. Implement the Solution

I write my code clearly and if using a whiteboard ensure I will have sufficient space.

I write psuedo functions to represent any busy work - and write out the solution from beginning to end before going to those functions to fill them out.

I use good variable names.

7. Testing the solution

I run a conceptual test - I question what I intended each line to do and then check whether the code does that

I double cheak lines where mistakes could easily be made - e.g. reference, iterations, array indexes and off by one errors

I consider edge cases and faulty inputs

If my solution is in JS I consider what each method returns - e.g. does the method sort in place or create a new array or do something else - push returns the new length of the array...

I run my initial test input through the algorithm, and run other test cases if time permits

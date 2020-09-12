
Remember no algorithm can guarantee you the best answer for a colouring question as it is a NP Complete problem so just providing a good enough answer is the goal.

https://www.geeksforgeeks.org/graph-coloring-applications/

Basic Greedy Coloring Algorithm:

1. Color first vertex with first color.
2. Do following for remaining V-1 vertices.
….. a) Consider the currently picked vertex and color it with the
lowest numbered color that has not been used on any previously
colored vertices adjacent to it. If all previously used colors
appear on vertices adjacent to v, assign a new color to it.

Analysis of Basic Algorithm

The above algorithm doesn’t always use minimum number of colors. Also, the number of colors used sometime depend on the order in which vertices are processed.

So the order in which the vertices are picked is important. Many people have suggested different ways to find an ordering that work better than the basic algorithm on average. The most common is Welsh–Powell Algorithm which considers vertices in descending order of degrees.

Good fairly simple article on it: http://mrsleblancsmath.pbworks.com/w/file/fetch/46119304/vertex%20coloring%20algorithm.pdf

How does the basic algorithm guarantee an upper bound of d+1?

Here d is the maximum degree in the given graph. Since d is maximum degree, a vertex cannot be attached to more than d vertices. When we color a vertex, at most d colors could have already been used by its adjacent. To color this vertex, we need to pick the smallest numbered color that is not used by the adjacent vertices. If colors are numbered like 1, 2, …., then the value of such smallest number must be between 1 to d+1

In graph theory, edge coloring of a graph is an assignment of “colors” to the edges of the graph so that no two adjacent edges have the same color with an optimal number of colors. Two edges are said to be adjacent if they are connected to the same vertex. Edge colouring can be effectively reduced to vertex colouring.

In general using the Walsh-Powell Algorithm is probably a good idea as it is fairly simple.

The steps are:

1. Find the valence for each vertex
2. Sort the vertices in order of descending valence
3. Color the first vertex in the list (the one with highest valence) with color 1
4. Go down the list and color every vertex not connected to that first vertex the same color.
5. Cross out/ ignore all coloured vertices
6. Repeat the process 2-5 on the remaining vertices using a new colour, working in descending order of valence, until all the vertices have been coloured.

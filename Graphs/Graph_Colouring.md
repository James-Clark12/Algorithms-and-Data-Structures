http://mrsleblancsmath.pbworks.com/w/file/fetch/46119304/vertex%20coloring%20algorithm.pdf

Fairly simple idea for colouring a graph in an efficient idea

Depending on the colour question it may be simpler to just use the greedy solution

Remember no algorithm can guarantee you the best answer for a colouring question so just providing a good enough answer is the goal.

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

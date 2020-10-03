
/*

Kruskal's algorithm is a simple alg for making an MST. It works for both directional and bidirectional graphs.

It is simple as it reusues the DSS (Disjoint set structure) and Union/ Find algorithm in a very simple way.

For this reason I prefer it over Prim's algorithm.

How does it work:

1. Create a DSS structure where each element is its own root
2. Create a min priority queue containing all the edges in the graph
3. Create a new graph in which to store the MST edges
4. While(the DSS contains more than one root && the min priority queue is not empty) {
  a). pop an edge from the queue (the edge with the min weight)
  b). if (the edge connects two separate trees in the graph (you can tell by their root, hence the dss)) {
    i). add the edge to the MST graph
  }
}
5. If at the end the DSS contains one root then you have created the MST, else an MST was not possible

*/

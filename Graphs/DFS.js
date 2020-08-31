/* Could edit this to a class with prototype methods rather than a series of functions - show of class/ prototype based inheritance understanding */

const DFS = (vertex, graph, visited, target) => {
  if (vertex === target) {
    console.log('Found target');
  }
  visited.set(vertex);
  let adjacentVertices = [...graph.get(vertex).keys()];
  while (adjacentVertices.length) {
    let newVertex = adjacentVertices.pop();
    if (!visited.has(newVertex)) {
      DFS(newVertex, graph, visited);
    }
  }
}


DFS(firstVertex, graphAsAdjacencyList, visitedNodesAsMap, targetVertex);

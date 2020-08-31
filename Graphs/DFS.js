/* Should edit this to a class with prototype methods rather than a series of functions - show of class/ prototype based inheritance understanding */


/* Key thing to remember with these functions is what you want out

// if you want to store some satellite information at every vertex then you could add the vertex itself to
// the values that the vertex maps to and then as the value of each vertex (which are the keys) have the
// sattelite information. At current - only edges are represented by the mapping and edge data (such as weight)
// can be represented in the mapping
// p.s. by represented in the mapping I mean that we are setting keys but not values - so values can be added
// if we want to store information

// asumes directionless edges
// edgeSatelliteData is an optional field

*/

const addEdge = (vertex1, vertex2, graph, edgeSatelliteData) => {
  // add edge from vertex 1 to vertex 2
  if (graph.has(vertex1)) {
    graph.get(vertex1).set(vertex2, edgeSatelliteData);
  } else {
    graph.set(vertex1, new Map());
    graph.get(vertex1).set(vertex2, edgeSatelliteData);
  }
  // add edge from vertex 2 to vertex 1
  if (graph.has(vertex2)) {
    graph.get(vertex2).set(vertex1, edgeSatelliteData);
  } else {
    graph.set(vertex2, new Map());
    graph.get(vertex2).set(vertex1, edgeSatelliteData);
  }
}

// checks a specific directional edge
const checkEdge = (vertex1, vertex2, graph) => {
  if (graph.get(vertex1).has(vertex2)) {
    console.log('Edge: {', vertex1, ',', vertex2, '} does exist.');
  } else {
    console.log('Edge: {', vertex1, ',', vertex2, '} does not exist.');
  }
  return graph.get(vertex1).has(vertex2);
}

// assumes directionless edges
const deleteEdge = (vertex1, vertex2, graph) => {
  graph.get(vertex1).delete(vertex2);
  graph.get(vertex2).delete(vertex1);
}

// touches every vertex in a
// doesnt make vertexes as visited - just deletes one (of potentially many) paths to them
// need a way of marking vertexes as visisted - could be a second Map - or more long winded storing as satellite data
const DFS = (vertex, graph, visited) => {
  console.log('In DFS at vertex: ', vertex);
  console.log('Visited vertices are: ', visited);
  visited.set(vertex);
  let adjacentVertices = [...graph.get(vertex).keys()];
  console.log('adjacentVertices are: ', adjacentVertices);
  while (adjacentVertices.length) {
    let newVertex = adjacentVertices.pop();
    if (!visited.has(newVertex)) {
      DFS(newVertex, graph, visited);
    }
  }
}

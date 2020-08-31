
const BFS = (graph, startVertext, target) => {
  const Q = new Set();
  const visited = new Set();
  Q.add(startVertext);
  while (Q.size) {
    const v = [...Q].shift();
    Q.delete(v);
    let neighbours = [...graph.get(v).keys()];
    neighbours = neighbours.filter(p => !visited.has(p));
    neighbours.forEach(p => Q.add(p));
    visited.add(v);
  }
}

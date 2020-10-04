
/*

Kruskal's algorithm is a simple alg for making an MST. It works for both directional and bidirectional graphs.

It is simple as it reusues the DSS (Disjoint set structure) and Union/ Find algorithm in a very simple way.

For this reason I prefer it over Prim's algorithm.

How does it work:

1. Create a DSS structure where each element is its own root
2. Create a min priority queue containing all the edges in the graph
3. Create a new graph in which to store the MST edges
4. Create a var 'n' equal to the number of nodes in the graph (n represents the number of separate sets in the MST)
5. While(n > 1 && the min priority queue is not empty) {
  a). pop an edge from the queue (the edge with the min weight)
  b). if (the edge connects two separate trees in the graph (you can tell by their root, hence the dss)) {
    i). unify the two nodes
    ii). add the edge to the MST graph
    iii). decrement n
  }
}
6. If at the end n === 1, else an MST was not possible

*/

// A perfect practice question for Kruskal's is: https://leetcode.com/problems/connecting-cities-with-minimum-cost/
// Solution is just an implementation of kruskal

var minimumCost = function(N, connections) {
    
    // const findRoot = (passedIndex, setMap) => {
    //     let index = passedIndex;
    //     while(index !== setMap[index]) {
    //         index = setMap[index];
    //     }
    //     // make all examined nodes point to the root
    //     // flattens tree so optimises time
    //     const root = index;
    //     index = passedIndex;
    //     while(index !== setMap[index]) {
    //         // iterate up the tree to find the root
    //         let newIndex = setMap[index];
    //         setMap[index] = root;
    //         index = newIndex;
    //     }
    //     return root;
    // }
    
    // smart as does compression and find in two lines
    // the commented out is equivalent but less concise/ elegant
    const findRoot = (index, setMap) => {
        if (index === setMap[index]) return index;
        return setMap[index] = findRoot(setMap[index], setMap);
    }
    
    const inSameSet = (n1, n2, dss) => {
        return findRoot(n1, dss) === findRoot(n2, dss);
    }
    
    const unify = (n1, n2, dss) => {
        const rootOfN1 = findRoot(n1, dss);
        const rootOfN2 = findRoot(n2, dss);
        dss[rootOfN2] = rootOfN1;
    }
    
    // step 1
    const dss = [];
    let cost = 0;
    for(let i=0; i<=N; i++) {
        dss[i]=i;
    }
    let n = N;
    
    // step 2
    const minPriorityQueue = connections.sort((a, b) => a[2] - b[2]);
    
    // step 3
    while(n !== 1 && minPriorityQueue.length) {
        // step 3a
        const [nodeOne, nodeTwo, edgeCost] = minPriorityQueue.shift();
        // step 3b
        if (!inSameSet(nodeOne, nodeTwo, dss)) {
            n--;
            unify(nodeOne, nodeTwo, dss);
            cost = cost + edgeCost;
        }
    }
    return n === 1 ? cost : -1;
};



## Topological Sort

This is actually very simple - the wikipedia page alone is sufficient to understand what it is all about:

In computer science, a topological sort or topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering. For instance, the vertices of the graph may represent tasks to be performed, and the edges may represent constraints that one task must be performed before another; in this application, a topological ordering is just a valid sequence for the tasks. **A topological ordering is possible if and only if the graph has no directed cycles, that is, if it is a directed acyclic graph (DAG). Any DAG has at least one topological ordering**, and algorithms are known for constructing a topological ordering of any DAG in linear time. Topological sorting has many applications especially in ranking problems such as feedback arc set.

There are two common Topological Sort Algorithms. Kahn's Algorithm and Depth First Search.

**Kahn's Algorithm**

**Pseudocode:**

    L ← Empty list that will contain the sorted elements
	S ← Set of all nodes with no incoming edge

	**while** S **is not** empty **do**
	    remove a node n from S
	    add n to L
	    **for each** node m with an edge _e_ from n to m **do**
	        remove edge e from the graph
	        **if** m has no other incoming edges **then**
	            insert m into S

	**if** graph has edges **then**
	    **return** error   _(graph has at least one cycle)_
	**else** 
	    **return** L   _(a topologically sorted order)_

**JavaScript implementation**

We created a node dependency graph rather than editing the actual graph passed in.

    const  Kahn = (graph) => {

		const  sortedElements = [];
		const  verticesWithNoIncomingEdges = [];
		const  visited = new  Set();

		/* assume the graph we are passed is an adjacency list where each node is a map where the keys are the other nodes it has edges too for the sake of this question we want a map where each node lists the incoming edges to it - or more specifically the nodes that have incoming edges to it this gives us its dependencies */

		const  nodeDependenciesMap = new  Map();

		// we can make this just using the grap data passed in
		[...graph.keys()].forEach(node  => {
			if (!nodeDependenciesMap.has(node)) {
				nodeDependenciesMap.set(node, new  Map());
			}
			const  neighbours = [...graph.get(node).keys()];
			neighbours.forEach(neighbour  => {
				if (nodeDependenciesMap.has(neighbour)) {
					nodeDependenciesMap.get(neighbour).set(node);
				} else {
					nodeDependenciesMap.set(neighbour, new  Map());
					nodeDependenciesMap.get(neighbour).set(node);
				}
			})
		})
		  
		// find starting node with no incoming edges
		// if there is none then graph is cyclical
		([...graph.keys()]).forEach(key  => {
			if (nodeDependenciesMap.get(key).size === 0) {
				verticesWithNoIncomingEdges.push(key);
			}
		});

		console.log('nodeDependenciesMap: ', nodeDependenciesMap)

		while(verticesWithNoIncomingEdges.length) {
			const  node = verticesWithNoIncomingEdges.pop();
			visited.add(node);
			sortedElements.push(node);
			const  neighbours = [...graph.get(node).keys()];
			neighbours.forEach(neighbour  => {
				if (!visited.has(neighbour)) {
					nodeDependenciesMap.get(neighbour).delete(node);
					if (nodeDependenciesMap.get(neighbour).size === 0) {
						verticesWithNoIncomingEdges.push(neighbour);
					}
				}
			})
		}  

		if ([...nodeDependenciesMap.keys()].some(key=> nodeDependenciesMap.get(key).size !== 0)) {
			// graph must be cyclical
			return  'error';
		} else {
			return  sortedElements;
		}
	}
		  
	const  DAG = new  Map();
	DAG.set(1, new  Map());
	DAG.set(2, new  Map());
	DAG.set(3, new  Map());
	DAG.set(4, new  Map());
	DAG.set(5, new  Map());
	  
	DAG.get(1).set(2);
	DAG.get(1).set(5);
	DAG.get(2).set(3);
	DAG.get(5).set(2);
	DAG.get(5).set(3);
	DAG.get(3).set(4);  

	console.log(Kahn(DAG));

**Depth First Search**

An alternative algorithm for topological sorting is based on depth-first search. The algorithm loops through each node of the graph, in an arbitrary order, initiating a depth-first search that terminates when it hits any node that has already been visited since the beginning of the topological sort or the node has no outgoing edges (i.e. a leaf node).

Each node _n_ gets _prepended_ (unshift to the start of the list) to the output list L only after considering all other nodes which depend on _n_ (all descendants of _n_ in the graph). Specifically, when the algorithm adds node _n_, we are guaranteed that all nodes which depend on _n_ are already in the output list L: they were added to L either by the recursive call to visit() which ended before the call to visit _n_, or by a call to visit() which started even before the call to visit _n_. Since each edge and node is visited once, the algorithm runs in linear time.

It is very similar to the black, grey, white algorithm used to detect cycles.

    L ← Empty list that will contain the sorted nodes
	**while** exists nodes without a permanent mark **do**
	    select an unmarked node n
	    visit(n)

	**function** visit(node n)
	    **if** n has a permanent mark **then**
	        **return**
	    **if** n has a temporary mark **then**
	        **stop**   _(not a DAG)_

	    mark n with a temporary mark

	    **for each** node m with an edge from n to m **do**
	        visit(m)

    remove temporary mark from n
    mark n with a permanent mark
    add n to _head_ of L

What this in effect does is repeatedly recurse down the graph to the deepest node (i.e. the one with dependencies but no dependent). These nodes are shifted up the visitInThisOrder list as we add more nodes. If we find a cycle we immediately return false.

**JavaScript implementation:**

    const DFSTopologicalSort = (graph) => {
		
		const DFSMethod = (graph, vertex, processMap, sortedOrder) => {
			// already processed so skip
			if(processMap.get(vertex)==='black') return false;
			// there is a cycle so break alg
			if(processMap.get(vertex)==='grey') return true;
			// else mark that we are processing this vertex
			processMap.set(vertex,'grey');

			const neighbours = [...graph.get(vertex).keys()];
			neighbours.forEach(neighbour => {
				if (DFSMethod(graph, neighbour, processMap, sortedOrder)) {
					// if it returns true then there is a cycle
					// and we should return this info up
					return true;
				}
			});
			// we have process all a node descendents so can set it to processed
			// and add it to sortedOrder list
			processMap.set(vertex, 'black');
			sortedOrder.unshift(vertex);
			// no cycle so return false
			return false;
		}

		const processMap = new Map();		
		const vertices = [...graph.keys()];
		const sortedOrder = [];
		while(vertices.length) {
			const vertex = vertices.pop();
			// if cycle it will return true
			// else will return false and fill sortedOrder array
			if(DFSMethod(graph, vertex , processMap, sortedOrder)) {
				return 'error cycle/ not DAG'
			}
		}
		return sortedOrder;
	}
	
	const  DAG = new  Map();
	DAG.set(1, new  Map());
	DAG.set(2, new  Map());
	DAG.set(3, new  Map());
	DAG.set(4, new  Map());
	DAG.set(5, new  Map());

	DAG.get(1).set(2);
	DAG.get(1).set(5);
	DAG.get(2).set(3);
	DAG.get(5).set(2);
	DAG.get(5).set(3);
	DAG.get(3).set(4);

	console.log(DFSTopologicalSort(DAG));

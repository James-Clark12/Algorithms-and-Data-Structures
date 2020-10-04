
// It may seem that DFS can easily solve all Union Find problems
// however this isn't so
// if a graph is undirected - then yes DFS can solve the problem fairly easily
// but when a graph is directed Union Find really shows its value (using its more complex find root and unify methods)
// consider a directed graph with the edges 1-->2-->3-->4-->5
// with DFS you start at node 1 and get to 5 - putting them as one set
// but what if there is another edge
// 6-->5
// DFS will be passed 6 by the queue and but 6 and 5 together
// it doesn't realise as union find would that 6 is actually part of this former set
// this is the value of Union Find vs DFS

// Union and Find are just the name of two operations
// the key to this 'algorithm' is actually the data structure used
// the disjoin set structure
// it is simply an array where the index in the array represents the node
// and the value at that index is a link to the parent/ root/ key for the set it is 
// a member of
// follow the values (using them as a link to another index) until the value is the same 
// as the index - then you have found the root/ key of the set

// All based on this resource:
// https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf
// this should all be a classes

/*
A nicer way of doing the find compression is:
// smart as does compression and find in two lines
const findRoot = (index, setMap) => {
    if (index === setMap[index]) return index;
    return setMap[index] = findRoot(setMap[index], setMap);
}
*/

const noOptimisationsUnionFind = (graph) => {

    const setsRecord = [];
    const nodeToIndexMap = {};
    const treeSize = [];
    
    ([...graph.keys()]).forEach((node, index) => {
        // we only need to access the nodeToIndexMap again at the very end
        // since the node values themselves aren't important - we can just use
        // the indexes as temporary representative values
        nodeToIndexMap[node] = index;
        setsRecord[index] = index;
    })

    const findRoot = (passedIndex) => {
        let index = passedIndex;
        while(index !== setsRecord[index]) {
            index = setsRecord[index];
        }
        return root;
    }

    const inSameSet = (p, q) => {
        return findRoot(p) === findRoot(q);
    }

    const union = (p, q) => {
        const rootOfP = findRoot(p);
        const rootOfQ = findRoot(q);
        setsRecord[rootOfQ] = rootOfP;
        treeSize[rootOfP] = treeSize[rootOfP] + treeSize[rootOfQ];
    }

}

const SimpleUnionFind = (graph) => {

    const setsRecord = [];
    const nodeToIndexMap = {};
    const treeSize = [];
    
    ([...graph.keys()]).forEach((node, index) => {
        // we only need to access the nodeToIndexMap again at the very end
        // since the node values themselves aren't important - we can just use
        // the indexes as temporary representative values
        nodeToIndexMap[node] = index;
        setsRecord[index] = index;
        treeSize[index] = 1;
    })

    const findRoot = (passedIndex) => {
        let index = passedIndex;
        while(index !== setsRecord[index]) {
            index = setsRecord[index];
        }
        // make all examined nodes point to the root
        // flattens tree so optimises time
        const root = index;
        index = passedIndex;
        while(index !== setsRecord[index]) {
            // iterate up the tree to find the root
            let newIndex = setsRecord[index];
            setsRecord[index] = root;
            index = newIndex;
        }
        return root;
    }

    const inSameSet = (p, q) => {
        return findRoot(p) === findRoot(q);
    }

    // takes constant time given the roots
    const union = (p, q) => {
        const rootOfP = findRoot(p);
        const rootOfQ = findRoot(q);

        // merge the smaller tree into the larger tree
        // update the tree size
        // depth is limited to log(N) - complex to prove but true
        if (treeSize[rootOfP] > treeSize[rootOfQ]) {
            setsRecord[rootOfQ] = rootOfP;
            treeSize[rootOfP] = treeSize[rootOfP] + treeSize[rootOfQ];
        } else {
            setsRecord[rootOfP] = rootOfQ;
            treeSize[rootOfQ] = treeSize[rootOfQ] + treeSize[rootOfP];
        }
    }

}

const UnionFindWithNoProxyVals = (graph) => {

    const setsRecord = [];
    const nodeToIndexMap = {};
    const treeSize = [];

    ([...graph.keys()]).forEach((node, index) => {
        nodeToIndexMap[node] = index;
        setsRecord[index] = node;
        treeSize[index] = 1;
    })

    const findRoot = (passedNode) => {
        node = passedNode;
        let index = nodeToIndexMap[node];
        while(node !== setsRecord[index]) {
            // iterate up the tree to find the root
            node = setsRecord[index];
            index = nodeToIndexMap[node];
        }
        // make all examined nodes point to the root
        // flattens tree so optimises time
        const root = node;
        node = passedNode;
        index = nodeToIndexMap[node];
        while(node !== setsRecord[index]) {
            // iterate up the tree to find the root
            node = setsRecord[index];
            setsRecord[index] = root;
            index = nodeToIndexMap[node];
        }
        return node;
    }

    const inSameSet = (p, q) => {
        return findRoot(p) === findRoot(q);
    }

    // takes constant time given the roots
    const union = (p, q) => {
        const rootOfP = findRoot(p);
        const rootOfQ = findRoot(q);

        const indexOfP = nodeToIndexMap[rootOfP];
        const indexOfQ = nodeToIndexMap[rootOfQ];

        // merge the smaller tree into the larger tree
        // update the tree size
        // depth is limited to log(N) - complex to prove but true
        if (treeSize[indexOfP] > treeSize[indexOfQ]) {
            setsRecord[indexOfQ] = rootOfQ;
            treeSize[indexOfQ] = treeSize[indexOfQ] + treeSize[indexOfP];
        } else {
            setsRecord[indexOfP] = rootOfP;
            treeSize[indexOfP] = treeSize[indexOfP] + treeSize[indexOfQ];
        }
    }

}

// Example of union find in action: leetcode question: https://leetcode.com/problems/friend-circles/submissions/

const findRoot = (passedIndex, setMap) => {
    let index = passedIndex;
    while(index !== setMap[index]) {
        index = setMap[index];
    }
    // make all examined nodes point to the root
    // flattens tree so optimises time
    const root = index;
    index = passedIndex;
    while(index !== setMap[index]) {
        // iterate up the tree to find the root
        let newIndex = setMap[index];
        setMap[index] = root;
        index = newIndex;
    }
    return root;
}

const inSameSet = (p, q, setMap) => {
    return findRoot(p, setMap) === findRoot(q, setMap);
}

const union = (p, q, setMap) => {
    const rootOfP = findRoot(p, setMap);
    const rootOfQ = findRoot(q, setMap);
    setMap[rootOfQ] = rootOfP;
}

const processNode = (node, setMap, M) => {
    const neighboursMap = M[node];
    const trueNeighbours = [];
    neighboursMap.forEach((val, index) => {
        if (val === 1 && index !== node) {
            trueNeighbours.push(index);
        }
    })
    trueNeighbours.forEach(neighbour => {
        // like a DFS go through neighbours unifying them
        if (!inSameSet(node, neighbour, setMap)) {
            union(node, neighbour, setMap);
            processNode(neighbour, setMap, M);
        }
    })
}

var findCircleNum = function(M) {
    
    const setMap = [];
    const queue = [];
    const N = M.length;
    
    for(let i=0; i<N; i++) {
        // all nodes start in their own set
        setMap[i] = i;
        queue.push(i);
    }
    
    //console.log('setMap 0: ', setMap);
    
    while(queue.length) {
        const node = queue.pop();
        processNode(node, setMap, M);
    }

    // return number of distinct sets in setMap
    console.log('setMap ', setMap)
    return new Set([ ...setMap]).size;
};

// This problem we can actually solve with just a simple very similar DFS

var findCircleNum = function(M) {
    
    const visited = new Set();
    let separateGroups = 0;
    const queue = [];
    const N = M[0].length;
    
    for(let i=0; i<N; i++) {
        // all nodes start in their own set
        queue.push(i);
    }
    
    
    const DFS = (node, visited, M) => {
        visited.add(node);
        const neighbours = M[node];
        const trueNeighbours = [];
        neighbours.forEach((neighbour, index) => {
            if (index !== node && neighbour === 1) {
                trueNeighbours.push(index);
            }
        })
        trueNeighbours.forEach(trueNeighbour => {
            if (!visited.has(trueNeighbour)) {
                DFS(trueNeighbour, visited, M)
            }
        })
    }
    
    while(queue.length) {
        const node = queue.pop();
        if (!visited.has(node)) {
            separateGroups++;
            DFS(node, visited, M);
        }
    }

    return separateGroups;
};

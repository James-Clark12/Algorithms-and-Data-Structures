
// All based on this resource:
// https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf
// this should all be a classes

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

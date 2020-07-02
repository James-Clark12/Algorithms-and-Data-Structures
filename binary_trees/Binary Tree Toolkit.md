# Binary Tree Toolkit

![diff](https://leetcode.com/problems/binary-tree-right-side-view/Figures/199_rewrite/traversals.png)

Above are the essential methods to move around Binary Trees. What is appropriate depends on the question/ what information we need from the tree. Below are the implementations for each of the above traversal (excluding Morris traversals).

Other operations that are essential to know are:

1. How to validate  a tree
2. Building BSTs from traversal data
3. Building BTs from traversal data

# Breadth First Traversal

### Iterative Breadth First Traversal

    var bfs = function(root) {

	    if (root === null) return [];
	    
	    let level = [root];
	    let nextLevel = [];
	    
	    while(level.length) {
	        
	        let node = null;
	        while(level.length) {
	            node = level.shift();
	            
	            // some action on the node
	            
	            if (node.left) {
	                nextLevel.push(node.left);
	            }
	            if (node.right) {
	                nextLevel.push(node.right);
	            }
	        }
	        level = nextLevel;
	        nextLevel = [];
	    }
};

### Recursive Breadth First Traversal

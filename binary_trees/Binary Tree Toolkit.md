
# Binary Tree Toolkit

![diff](https://leetcode.com/problems/binary-tree-right-side-view/Figures/199_rewrite/traversals.png)

Above are the essential methods to move around Binary Trees. What is appropriate depends on the question/ what information we need from the tree. Below are the implementations for each of the above traversal (excluding Morris traversals).

Other operations that are essential to know are:

1. How to validate  a tree
2. Building BSTs from traversal data
3. Building BTs from traversal data
4. Balancing BSTs

# Breadth First Traversal

### Iterative Breadth First Traversal

Essentially uses a queue structure to iterate through the levels of the tree. Any question that focuses on the levels in the trees can likely be solved using this method.

    var iterativeBFS = function(root) {

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

There is often little reason to carry out  a BFS recursively rather than iteratively but it can be done. We just use a DFS traversal but also pass the level in the traversal function - in this sense it is not really a BFS but we can build a BFS picture from the DFS. We want to use InOrder (or maybe PreOrder?) traversal so that our BFS levels are correctly ordered.

    var recursiveBFS = function(root) {

		const levels = [];

		const insertNodeAtLevel = (levelIndex, node) => {
			if(levels[levelIndex] !== undefined) {
				levels[levelIndex].push(node);
			} else {
				levels[levelIndex] = [node];
			}
		}

	    const inOrderTraverse = (node, level) => {
			if (node !== null) {
				inOrderTraverse(node.left, level+1);
				insertNodeAtLevel(level, node);
				inOrderTraverse(node.right, level+1);
			}	
		}
		
		// levels is your BFS map of the binary tree
		return levels;
	}

# Depth First Traversal

## InOrder Traversal

### Recursive InOrder Traversal

    const inOrder = (node) => {
		if (node !== null) {
			inOrder(node.left);
			console.log(node.val);
			inOrder(node.right);
		}
	}

### Iterative InOrder Traversal

    const iterativeInOrderTraversal = (root) => {
		
		const stack = [];
		let current = root;

		while(current !== null || stack.length !== 0) {
			if (current !== null) {
				stack.push(current);
				current = current.left;
			} else if (current === null) {
				current = stack.pop();
				console.log('val is: ', current.val);
				current = current.right;
			}
		}
	}

## PreOrder Traversal

### Recursive PreOrder Traversal

    const preOrder = (node) => {
		if (node !== null) {
			console.log(node.value);
			preOrder (node.left);
			preOrder (node.right);
		}
	}

### Iterative PreOrder Traversal

    const iterativePreOrderTraversal = (root) => {
		
		const stack = [];
		let current = root;

		while(current !== null || stack.length !== 0) {
			if (current !== null) {
				console.log('val is: ', current.val); // do node action here
				stack.push(current);
				current = current.left;
			} else if (current === null) {
				current = stack.pop();
				current = current.right;
			}
		}
	}

## PostOrder Traversal

### Recursive PostOrder Traversal

    const postOrder = (node) => {
		if (node !== null) {
			preOrder (node.left);
			preOrder (node.right);
			console.log(node.value);
		}
	}

### Iterative PostOrder Traversal

[https://www.geeksforgeeks.org/iterative-postorder-traversal/](https://www.geeksforgeeks.org/iterative-postorder-traversal/)

[https://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/](https://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/)

    const iterativePostOrderTraversal = (root) => {
		
		const stack = [];
		const reverse = [];
		let current = root;

		while(current !== null || stack.length !== 0) {
			if (current !== null) {
				stack.push(current);
				reverse.push(current.val);
				current = current.right;
			} else if (current === null) {
				current = stack.pop();
				current = current.left;
			}
		}

		while (reverse.length > 0) {
			console.log('val: ', reverse.pop());
		}
	}

# Validating a tree

The crucial thing to remember here is that showing for each parent node that it's left and right child are valid is not sufficient to show a BST is valid. For a BST to be valid there can be no descendant (child of child) to the left of a node that is greater than it and no descendant to the right of a node that is less than it.

https://leetcode.com/articles/validate-binary-search-tree/

    var isValidBST = function(root) {
	    const validateTree = (node, min, max) => {
		    if (node === null) return true;
		    // check if node val is within the limits of what it can be
		    if (!(node.val > min && node.val < max)) {
			    return false;
		    }
		    let leftValid = validateTree(node.left, min, node.val);
		    let rightValid = validateTree(node.right, node.val, max);
		    return leftValid && rightValid;
	    };
	    return validateTree(root, -Infinity, Infinity);
    };

# Finding a path from one node to another

This is a really crucial operation for finding paths between multiple node and finding their common ancestors.

    const hasPath = (node, stack, target) => {
	    if (node === null) {
		    return false;
	    }
	    
	    stack.push(node.val);
	    if (node === target) {
		    return true;
	    }
	    
	    if (hasPath(node.left, stack, target) || hasPath(node.right, stack, target)) {
		    return true;
	    }
	    
	    stack.pop();
	    return false;
    }
    
    let pathToP = [];
    hasPath(root, pathToP, p);
    console.log(pathToP);

# Finding the Lowest Common Ancestor of two nodes

    const lowestCommonAncestor = (node, p, q) => {
    	
    	if (!node) return node;
    	if (node === p || node === q) return node;
    	
    	const nodeIsInLeft = lowestCommonAncestor(node.left, p, q)
    	const nodeIsInRight = lowestCommonAncestor(node.right, p, q)
    	
    	if (nodeIsInRight && nodeIsInLeft) {
	    	return node; // this is the LCA
    	}
    	
    	if (nodeIsInLeft === null) return nodeIsInRight // p and q are in the right subtree
    	if (nodeIsInRight === null) return nodeIsInLeft // p and q are in the left subtree
    };

We can also achieve this using the hasPath method from above:

	var lowestCommonAncestor = function(root, p, q) {

		const hasPath = (node, stack, target) => {
			if (node === null) {
				return false;
			}
			stack.push(node);
			if (node === target) {
				return true;
			}
			if (hasPath(node.left, stack, target) || hasPath(node.right, stack, target)) {
				return true;
			}
			stack.pop();
			return false;
		}

		let pathToP = [];
		let pathToQ = [];

		if (!(hasPath(root, pathToP, p) && hasPath(root, pathToQ, q))) {
			console.log('There is no path')
		}

		let ancestor = root;
		// which is shorter doesnt matter as must have a connector before or at end (hence <= not <)
		for(let i=0; i<=pathToQ.length; i++) { 
			if (pathToQ[i] !== pathToP[i]) {
				ancestor = pathToQ[i-1];
				break;
			}
		}

		// console.log(pathToP);
		// console.log(pathToQ);
		// console.log(ancestor)
		return ancestor;
	}

# Building a BST from traversal data

### Building a BST from PreOrder traversal data

A very similar to the logic to testing whether a binary search tree is valid is used.

    var bstFromPreorder = function(preorder) {
    
	    const buildTree = (lower, upper) => {
		    if (preorder[0] < lower || preorder[0] > upper) return null;
		    if (preorder.length == 0) return null;
		    let root = new TreeNode(preorder.shift());
		    root.left = buildTree(lower, root.val);
		    root.right = buildTree(root.val, upper);
		    return root;
	    }
	    
	    return buildTree(-Infinity, Infinity);
    }

### Building a BST from PostOrder traversal data

https://www.techiedelight.com/build-binary-search-tree-from-postorder-sequence/#:~:text=Given%20a%20distinct%20sequence%20of,tree%20from%20the%20postorder%20sequence.&text=For%20a%20given%20postorder%20sequence,it%20starting%20from%20the%20right.

    const bstFromPostOrder = (postOrder) => {
    
	    let index = postOrder.length-1;
	    
	    const buildBST = (min, max) => {
		    // base case
		    if (index < 0) return null;
		    
		    const curr = postOrder[index];
		    
		    // if not in valid range return null
		    if (curr < min || curr > max) return null;
		    
		    // construct node and decrement index
		    const node = new TreeNode(curr, null, null);
		    index = index-1;
	    
		    // construct left and right subtree of the root node
		    // build right first as a we read backwards from the root
		    // this is postorder array sequence
		    node.right = buildBST(curr+1, max);
		    node.left = buildBST(min, curr-1);
		    return node;
	    }
	    
	    return buildBST(-Infinity, Infinity);
    }
    
    console.log(bstFromPostOrder([8,12,10,16,25,20,15]));

### Building a BST from InOrder traversal data

This cannot be done as the InOrder traversal data doesn't not give you sufficient information to identify the exact structure of the BST. You can of course build a BST using InOrder data but there is no guarantee it will have the same structure that the data is from.

# Balancing a BST

The most unbalanced BST is a BST where the elements were inserted in ascending or descending order. In this case height will equal number of elements. To create a balanced tree we want to recursively add the middle element of the array to the tree such that half the remaining elements to be inserted will have a greater value and half will have a smaller value.

![enter image description here](https://i.imgur.com/94MZz6D.png)

   Question on the topic: https://leetcode.com/problems/balance-a-binary-search-tree/

	var balanceBST = function(root) {
		// get elements in order
		const orderedElements = [];
		const traverse = (node) => {
			if (node) {
				traverse(node.left);
				orderedElements.push(node.val);
				traverse(node.right);
			}
		}
		traverse(root);

		// build the balanced tree
		const pushMiddle = (left, right) => {
			let node = null;
			if (right >= left) {
				let middle = Math.floor((right-left)/2) + left;
				node = new TreeNode(orderedElements[middle]);
				node.left = pushMiddle(left, middle-1);
				node.right = pushMiddle(middle+1, right);
			}
			return node;
		}
		return pushMiddle(0, orderedElements.length-1);
	};

# Comprehensive BST Class

	class Node {
		constructor(data) {
			this.val = data;
			this.left = null;
			this.right = null;
		}
	}

	class  BinarySearchTree {
		constructor() {
			this.root = null;
		}

		printTree = () => {
			console.log(this.root);
		}
		  
		insert = (value) => {
			this.root = this.insertNode(this.root, new  Node(value));
		}
		  
		insertNode = (root, node) => {
			if (root === null) {
				return  node;
			} else  if (root.val >= node.val) {
				root.left = this.insertNode(root.left, node);
				return  root;
			} else {
				root.right = this.insertNode(root.right, node);
				return  root;
			}
		}

		// recursive is much more reliable and harder to get wrong - use recursive methods
		iterativeInsert = (value) => {
			this.iterativeInsertNode(this.root, new  Node(value));
		}

		iterativeInsertNode = (root, node) => {
			let  pointer = root;
			let  prev = pointer;
			while(pointer !== null) {
				prev = pointer;
				if (node.val <= pointer.val) {
					pointer = pointer.left;
				} else {
					pointer = pointer.right;
				}
			}

			if (prev === null) {
				this.root = node;
			} else  if (node.val <= prev.val) {
				prev.left = node;
			} else {
				prev.right = node;
			}
		}	  

		delete = (val) => {
			return  this.deleteNode(this.root, val);
		}		  

		deleteNode = (node, valToBeDeleted) => {
			// node may not exist
			if (node === null) return  null;
			
			// else if we find it
			if (node.val === valToBeDeleted) {
				// three cases
				
				// 1. has no children
				if (node.left === null && node.right === null) {
					return  null;
					
				//2. there is one child
				} else  if (node.left === null) {
					node = node.left;
					return  node;
				//2. there is one child
				} else  if (node.right === null) {
					return  node.right;
					
				//3. there are two children
				} else {
					// get the smallest right hand node, set that as node val, then call delete on the node
					// that was copied
					let  successor = node.right;
					while(successor.left !== null) {
						successor = successor.left;
					}
					node.val = successor.val;
					this.deleteNode(successor, successor.val);
					return  node;
				}
			} else {
				if (valToBeDeleted <= node.val) {
					node.left = this.deleteNode(node.left, valToBeDeleted);
				} else {
					node.right = this.deleteNode(node.right, valToBeDeleted);
				}
				return  node;
			}
		}
		  
		find = (value) => {
			return  this.findNode(this.root, value);
		}
		  
		findNode = (root, val) => {
			if (root === null) return -1;
			if (root.val === val) return  root;
			if (root.val > val) return  this.findNode(root.left, val);
			return  this.findNode(root.right, val);
		}  

		findMin = () => {
			return  this.findMinNode(this.root);
		}	  

		findMinNode = (root) => {
			if (root.left === null) return  root;
			return  this.findMinNode(root.left);
		}	  

		findMax = () => {
			return  this.findMaxNode(this.root);
		}
		  
		findMaxNode = (root) => {
			if (root.right === null) return  root;
			return  this.findMaxNode(root.right);
		}
		  
		getHeight = () => {
			return  1 + Math.max(this.getTreeHeight(this.root.left), this.getTreeHeight(this.root.right));
		}

		getTreeHeight = (root) => {
			if (root === null) return  0;
			return  1 + Math.max(this.getTreeHeight(root.left), this.getTreeHeight(root.right));
		}
		
		printLevels = () => {
			let  height = this.getHeight();
			for(let  i=1; i<height+1; i++) {
				this.printLevel(this.root, i);
				console.log("\n")
			}
		}

		printLevel = (node, level) => {
			if (node === null) return;
			// prints once we get to level
			if (level === 1) {
				console.log(node.val, ' ');
			} else  if (level > 1) {
				this.printLevel(node.left, level-1);
				this.printLevel(node.right, level-1);
			}
		}

		// esenntially a queue based BFS
		iterativePrintLevelsUsingQueue = () => {
			if(this.root === null) console.log('Root is null');
			let  queue = [];
			queue.push(this.root);
			while(queue.length > 0) {
				let  counter = queue.length;
				while(counter > 0) {
					let  node = queue.shift();
					console.log(node.val);
					if (node.left !== null) {
						queue.push(node.left);
					}
					if (node.right !== null) {
						queue.push(node.right);
					}
					counter = counter - 1;
				}
				console.log("\n");
			}
		}
	}

	  

	const  test = new  BinarySearchTree();
	test.iterativeInsert(5);
	test.iterativeInsert(2);
	test.iterativeInsert(7);
	test.iterativeInsert(1);
	test.iterativeInsert(-1);
	test.iterativeInsert(3);
	console.log('Tree height is: ', test.getHeight());
	test.printTree();
	test.iterativePrintLevelsUsingQueue();

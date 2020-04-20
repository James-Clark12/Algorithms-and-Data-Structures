/* Preamble on what trees are:

  -Trees are a type of graph
  
  -A tree is a data structure composed  of node
  - All trees have a roote node
  - the root node has 0 or N children (N is 2 in the case of binary trees)
  - all those children have 0 or N children
  
  -Trees do not contain cycles
  
  -Node can both have or not have links back to their parents
  
  -Trees can be implemented in a number of ways (my preference is array as easy to navigate)
  
  -Binary search trees are binary trees where every node fits a specific ordering property, namely:
  all left descendents <= n < all right descendents 
  (not really mean descendents not children here - as rule includes children of children)
  
  -balanced trees are trees which are not unbalanced - that is to say trees where the left branch is 
  not greatly longer than the right branch or vice versa (they're not necessarily perfectly balances)
  
  -Complete binary tree - binary tree in which every level of the tree other than the last is filled (the last can also be filled
  making it a perfect binary tree)
  
  -Full binary tree - each node has either two or no children
  
  -Perfect binary tree - tree that is both full and complete

*/


/* 

  Traversing trees:
  
  There are three common traversal orders:
  
  1. In-Order traversal
    On a BST tree it visits the nodes in ascending order
    
  2. Pre-order traversal
    -Visits the current node, then its left child, then its right

  3. Post-order traversal
    -Visits current node after having visited its children

const Parent = (i) => {
  return Math.ceil(i/2 - 1)
}

const Left = (i) => {
  return i*2 + 1;
}

const Right = (i) => {
  return i*2 + 2;
}

const Minimum = (array) => {
  let index = 0;
  while (index < array.length) {
    index = Left(index);
  }
  index = Parent(index);
  return array[index];
}

const MinimumWithIndex = (array, index) => {
  while (index < array.length) {
    index = Left(index);
  }
  index = Parent(index);
  return index;
}

const Maximum = (array) => {
  let index = 0;
  while (index < array.length) {
    index = Right(index);
  }
  index = Parent(index);
  return array[index];
}

const TreeSearch = (array, element) => {
  let index = 0;
  while (index < array.length) {
    if (array[index] === element) {
      return index;
    } else if (array[index] >= element) {
      index = Left(index);
    } else if (array[index] < element) {
      index = Right(index);
    }
  }
  return -1;
}

const PrintTree = (treeArray) => {
  let level = 1;
  for(let i=0; i<treeArray.length; i++) {
    if (i === (level-1)) {
      console.log('\n***** Level: ', level, '*****\n');
      level = level * 2;
    }
    console.log(' ', treeArray[i], ' ');
  }
}

const InsertElement = (array, element) => {
    let i = 0;
    while(array[i] !== undefined) {
        if (element <= array[i]) {
            i = Left(i);
        } else if (element > array[i]) {
            i = Right(i);
        }
    }
    array[i] = element;
    return i;
};

// const InsertElement = (array, element) => {
//   let i = 0;
//   if (array[0] === undefined) {
//     array[0] = element;
//     return;
//   }
//   while (i < array.length) {
//     console.log('i is: ', i, ' array[i] is: ', array[i], ' element is: ', element);
//     if (array[i] === undefined) {
//       break;
//     } else if (array[i] >= element) {
//       console.log('array item is greater than element');
//       i = Left(i);
//     } else if (element > array[i]) {
//       console.log('array item is less than element');
//       i = Right(i);
//     };
//     console.log('how here?');
//   }
//   i = Parent(i);
//   if (array[i] >= element) {
//     array[Left(i)] = element;
//   } else {
//     array[Right(i)] = element;
//   }
// }

/* Deleting an element is the most complex BST operation
There are three cases to consider:
1. Element to be deleted has no children - easy, just delete it
2. Element to be deleted has one child - easy just replace it with its child (and move that child's children correspondingly)
3. Element to be deleted has two children - most complex scenario - soution described below

An important property of BSTs is that the same set of elements can be represented by multiple BST's - what determines the
structure of a BST is the order in which elements are inserted - not the set of elements themselves. Deleting a node takes
advantage of this by chaing the structure of the BST to one which makes sense despite that node being removeDuplicates

The method to do this is:
1. Get the node to be deleted's successor - this is the smallest element greater than the node to be deleted  (just the min of the node right subtree)
2. Overwrite the value of the node to be deleted with the value of the successor
3. Call the delete funcion again on the successor node's position (so the delete function is called recursively until a node can be removed according to cases
1 and 2 rather than 3)

Beautiful and simple! - but don't forget there is some complexity in moving the children in case 2
*/

const DeleteElementAtIndex = (array, i) => {
  /*Case 1*/
  if (array[Left(i)] === undefined && array[Right(i)] === undefined) {
    array[i] = undefined;
    return;
  }
  /*Case 2*/
  if (array[Left(i)] !== undefined && array[Right(i)] === undefined) {
    array[i] = array[Left(i)];
    return DeleteElementAtIndex(array, Left(i));
  }
  if (array[Right(i)] !== undefined && array[Left(i)] === undefined) {
    array[i] = array[Right(i)];
    return DeleteElementAtIndex(array, Right(i));
  }
  /*Case 3*/
  if (array[Left(i)] !== undefined && array[Right(i)] !== undefined) {
    const successorIndex = MinimumWithIndex(array, Right(i));
    array[i] = array[successorIndex];
    DeleteElementAtIndex(array, successorIndex);
  }
}

const bst = [];

console.log('Running...');
InsertElement(bst, 5);
InsertElement(bst, 7);
InsertElement(bst, 2);
InsertElement(bst, 9);
InsertElement(bst, 6);
InsertElement(bst, 1);
InsertElement(bst, 3);
InsertElement(bst, 0);
InsertElement(bst, 2);
InsertElement(bst, 3);
InsertElement(bst, 4);
console.log('bst is: ', bst);
PrintTree(bst);
DeleteElementAtIndex(bst, 3);
PrintTree(bst);

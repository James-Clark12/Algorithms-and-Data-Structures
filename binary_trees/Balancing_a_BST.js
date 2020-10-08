https://leetcode.com/problems/balance-a-binary-search-tree/

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

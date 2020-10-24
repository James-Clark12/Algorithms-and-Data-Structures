215. Kth Largest Element in an Array <-- good example of this sort of question
https://leetcode.com/problems/kth-largest-element-in-an-array/


class MinHeap {
    constructor(k){
        this.tree = [];
        this.treeMaxSize = k;
    }
    left = (i) => {
        return i*2 + 1;
    }
    right = (i) => {
        return i*2 + 2;
    }
    parent = (i) => {
        return Math.ceil(i/2) - 1;
    }
    swap = (i,j) => {
        let temp = this.tree[i];
        this.tree[i] = this.tree[j];
        this.tree[j] = temp;
    }
    add = (val) => {
        if (this.tree.length >= this.treeMaxSize && val > this.tree[0]) {
            this.tree[0] = val;
            this.bubbleDown(0);
        } else if (this.tree.length >= this.treeMaxSize && val <= this.tree[0]) {
               
        } else {
            this.tree[this.tree.length] = val;
            this.bubbleUp(this.tree.length-1);
        }
    }
    bubbleDown = (i) => {
        let largest = i;
        if (this.left(i) <= this.tree.length && this.tree[this.left(i)] < this.tree[i]) {
            largest = this.left(i);
        }
        if (this.right(i) <= this.tree.length && this.tree[this.right(i)] < this.tree[largest]) {
            largest = this.right(i);
        }
        if (largest !== i) {
            this.swap(largest, i);
            this.bubbleDown(largest);
        }
    }
    bubbleUp = (i) => {
        while(i > 0 && this.tree[this.parent(i)] > this.tree[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    min = () => {
        return this.tree[0];
    }
    printHeap = () => {
        console.log(this.tree);
    }
}

var findKthLargest = function(nums, k) {
    let mh = new MinHeap(k);
    for(let num of nums) {
        mh.add(num);
    }
    return mh.min();
};


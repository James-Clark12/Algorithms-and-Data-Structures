/* 
Great complexity analysis:
https://stackoverflow.com/questions/9755721/how-can-building-a-heap-be-on-time-complexity
*/

class MaxHeap {
    // data should be an array
    constructor(data = []) {
        this.tree = data;
    }
    parent = (i) => {
        return Math.ceil(i/2 - 1);
    }
    left = (i) => {
        return (i*2) + 1;
    }
    right = (i) => {
        return (i*2) + 2;
    }
    swap = (i1, i2) => {
        const temp = this.tree[i1];
        this.tree[i1] = this.tree[i2];
        this.tree[i2] = temp;
    }
    printLevels = () => {
        let level = [0];
        let nextLevel = [];
        while(level.length) {
            console.log((level.map(el => this.tree[el])).join(','));
            while(level.length) {
                let index = level.shift();
                if (index < this.tree.length) {
                    nextLevel.push(this.left(index));
                    nextLevel.push(this.right(index));
                }
            }
            level = nextLevel;
            nextLevel = [];
        }
    }
    // checks an element is no higher than it shoud be
    // that is it
    maxHeapify = (i, heapSize=this.tree.length) => {
        let leftChildIndex = this.left(i);
        let rightChildIndex = this.right(i);
        let largest = i;
        if (leftChildIndex < heapSize && this.tree[leftChildIndex] > this.tree[largest]) {
            largest = leftChildIndex;
        }
        if (rightChildIndex < heapSize && this.tree[rightChildIndex] > this.tree[largest]) {
            largest = rightChildIndex;
        }
        if (i !== largest) {
            this.swap(largest, i);
            this.maxHeapify(largest);
        }
        return this.tree;
    }
    buildMaxHeap = () => {
        // only need to do half the array as if any children are larger than their parent
        // they will be swapped up
        for(let i=Math.ceil(this.tree.length/2); i>=0; i--) {
            console.log('faf12 calling maxHeapify on index: ',i, 'element: ', this.tree[i]);
            this.maxHeapify(i);
        }
        return this.tree;
    }
    increaseKey = (i, newVal) => {
        if (newVal < this.tree[i]) throw 'error';
        this.tree[i] = newVal;
        while(i>0 && this.tree[i] > this.tree[this.parent(i)]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    insert = (val) => {
        this.tree[this.tree.length] = -Infinity;
        this.increaseKey(this.tree.length, val);
    }
    extractmax = () => {
        const max = this.tree[0];
        this.swap(0, this.tree.length-1);
        this.tree.length = this.tree.length-1;
        this.maxHeapify(0);
        return max;
    }
    heapSort = () => {
        // destrous the heap, but easy to change it so that it doesnt
        const sorted = [];
        while(this.tree.length) {
            sorted.unshift(this.extractmax());
        }
        return sorted;
    }
    validMaxHeapChecker = () => {
        for(let i=0; i<this.tree.length; i++) {
            let left = this.tree[this.left(i)];
            let right = this.tree[this.right(i)];
            if (left !== undefined && left > this.tree[i]) {
                return false;
            }
            if (right !== undefined && right > this.tree[i]) {
                return false;
            }
        }
        return true;
    }
}

const mh = new MaxHeap([5,1,2,7,9,12,5,7]);
console.log(mh.validMaxHeapChecker());
mh.printLevels();
mh.buildMaxHeap();
console.log(mh.validMaxHeapChecker());
mh.printLevels();
console.log(mh.heapSort());
/*
mh.insert(1);
mh.insert(4);
mh.insert(2);
mh.insert(9);
mh.insert(3);
mh.printLevels();
console.log(mh.extractmax());
mh.printLevels();
console.log(mh.extractmax());
console.log(mh.extractmax());
mh.printLevels();
*/

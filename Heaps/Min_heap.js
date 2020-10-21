class MinHeap {
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
    // checks an element is no higher than it should be
    minHeapify = (i) => {
        let left = this.left(i);
        let right = this.right(i);
        let largest = i;
        if (this.tree[left] !== undefined && this.tree[left] < this.tree[largest]) {
            largest = left;
        }
        if (this.tree[right] !== undefined && this.tree[right] < this.tree[largest]) {
            largest = right;
        }
        if (largest !== i) {
            this.swap(i, largest);
            this.minHeapify(largest);
        }
        return this.tree;
    }
    buildMinHeap = () => {
        // only need to do half the array as if any children are larger than their parent
        // they will be swapped up
        for(let i=Math.ceil(this.tree.length/2); i>=0; i--) {
            this.minHeapify(i);
        }
        return this.tree;
    }
    increaseKey = (i, newVal) => {
        if (newVal < this.tree[i]) throw 'error';
        this.tree[i] = newVal;
        this.minHeapify(i);
    }
    decreaseKey = (i, newVal) => {
        if (newVal > this.tree[i]) throw 'error';
        this.tree[i] = newVal;
        while(i>0 && this.tree[this.parent(i)] < this.tree[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    insert = (newVal) => {
        this.tree[this.tree.length] = Infinity;
        this.decreaseKey(this.tree.length-1, newVal);
    }
    extractMin = () => {
        this.swap(0, this.tree.length-1);
        const min = this.tree[this.tree.length-1];
        this.tree.length = this.tree.length-1;
        this.minHeapify(0);
        return min;
    }
    heapSort = () => {
        const sorted = [];
        while(this.tree.length) {
            sorted.push(this.extractMin());
        }
        return sorted;
    }
    validMinHeapChecker = () => {
        for(let i=0; i<this.tree.length; i++) {
            let left = this.tree[this.left(i)];
            let right = this.tree[this.right(i)];
            if (left !== undefined && left < this.tree[i]) {
                return false;
            }
            if (right !== undefined && right < this.tree[i]) {
                return false;
            }
        }
        return true;
    }
}

const mh = new MinHeap([3,2,11,5,6,2,4,7,6]);
console.log(mh.validMinHeapChecker());
mh.printLevels();
mh.buildMinHeap();
console.log(mh.validMinHeapChecker());
mh.printLevels();
//console.log(mh.heapSort());
mh.insert(1); // so inert doesnt work
mh.insert(4);
mh.insert(2);
mh.insert(9);
mh.insert(3);
mh.printLevels();
/*
console.log(mh.extractmax());
mh.printLevels();
console.log(mh.extractmax());
console.log(mh.extractmax());
mh.printLevels();
*/

/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function(k) {
    this.arr = new Array(k).fill(undefined);
    this.front = -1;
    this.rear = -1;
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
    if (this.isFull()) {
        return false;
    } else {
        if (this.front === -1) {
            this.front = 0;
            this.rear = 0;
            this.arr[this.front] = value;
        } else if (this.front === 0) {
            this.front = this.arr.length-1;
            this.arr[this.front] = value;
        } else {
            this.front = this.front - 1;
            this.arr[this.front] = value;
        }
        return true;
    }
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
    if (this.isFull()) {
        return false;
    } else {
        if (this.rear === -1) {
            this.rear = 0;
            this.front = 0;
            this.arr[this.rear] = value;
        } else if (this.rear === this.arr.length-1) {
            this.rear = 0;
            this.arr[this.rear] = value;
        } else {
            this.rear = this.rear + 1;
            this.arr[this.rear] = value;
        }
        return true;
    }
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
    if (this.front === -1) return false;
    this.arr[this.front] = undefined;
    if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
    } else if (this.front === this.arr.length-1) {
        this.front = 0;
    } else {
        this.front = this.front + 1;
    }
    return true;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
    if (this.rear === -1) return false;
    this.arr[this.rear] = undefined;
    if (this.rear === this.front) {
        this.rear = -1;
        this.front = -1;
    } else if (this.rear === 0) {
        this.rear = this.arr.length-1;
    } else {
        this.rear = this.rear - 1;
    }
    return true;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
    if (this.front === -1) return -1;
    return this.arr[this.front];
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
    if (this.rear === -1) return -1;
    return this.arr[this.rear];
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    if (this.front === -1 && this.rear === -1) {
        return true;
    }
    return false;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
    if ((this.front === this.rear + 1) || (this.rear === this.arr.length-1 && this.front === 0)) {
        return true;
    } else {
        return false;
    }
};

/** 
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */

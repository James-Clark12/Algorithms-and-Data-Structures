
So is the queue rear and front always point to the front elememnt and end element.
This creates an edge case where at the beginning both of them are behaving differently to usual as they both point to undefined.
This can be handled fairly easy by checking when enQueuing if rear is undefined (if so dont increment rear index)
and checking if front === rear when dequeuing - if so dont change index
Other than that it is fairly simple

/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.queue = new Array(k).fill(undefined);
    this.size = k;
    this.front = 0;
    this.rear = 0;
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) return false;
    if (this.queue[this.rear] === undefined) {
        this.queue[this.rear] = value;
    } else if (this.rear === this.size-1) {
        this.rear = 0;
        this.queue[this.rear] = value;
    } else {
        this.rear = this.rear + 1;
        this.queue[this.rear] = value;
    }
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) return false;
    
    const front = this.queue[this.front];
    this.queue[this.front] = undefined;

    // update font
    if (this.front === this.rear) {
        // no need to change index
    } else if (this.front === this.size-1) {
        this.front = 0;
    } else {
        this.front = this.front+1;
    }
    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) return -1;
    const front = this.queue[this.front];
    return front;
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) return -1;
    const rear = this.queue[this.rear];
    return rear;
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    if (this.queue[this.front] === undefined) return true;
    return false;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    if (this.rear === this.size-1 && this.front === 0) return true;
    if (this.front === this.rear + 1) return true;
    return false;
};

/** 
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

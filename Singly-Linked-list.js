// Important thing to be aware of - the methods of this class will all fail/ behave unusually IF the linkedList is constructed
// without a value passed - the first element in the LL will be an empty object {value: undefined, next: null}

// working with this is possible but confusing - it is better to add a conditional in the constructor like: 

//     constructor(value) {
//         if (value !== undefined) {
//             this.head = {value, next: null};
//         } else {
//             this.head = null;
//         }
//     }

// General idea - suppose linked list A,B,C,D,E - you have a link to C and need to delete it
// you can delete it even without a reference to B by overwriting C with D's data, and D with E's data, and then deleting E

class LinkedList {
    constructor(value) {
      this.head = null;
      if (value !== undefined) {
          this.head = {value, next: null};
      }
    }

    //assumes head is initiliased
    getTail = () => {
        let node = this.head;
        while(node.next !== null) {
            node = node.next;
        }
        return node;
    }

    // things are added to the front of the list
    addToHead = (value) => {
        const node = this.head;
        this.head = {value, next: node};
    }

    // add to the end of this
    addToTail = (value) => {
        if (this.head === null) {
            this.head = {value, next: null};
        } else {
            let node = this.getTail();
            node.next = {value, next: null};
        }
    }

    bulkAddToHead = (arr) => {
        arr.forEach(element => {
           this.addToHead(element);
        });
    }

    bulkAddToTail = (arr) => {
        arr.forEach(element => {
           this.addToTail(element);
        });
    }

    printList = () => {
        if (this.head === null) {
            console.log('Empty list');
        } else {
            console.log('//////////////////// List Start ////////////////////');
            let node = this.head;
            while (node !== null) {
                console.log(node.value);
                node = node.next;
            }
            console.log('//////////////////// List End ////////////////////');
        }
    }
  removeDuplicates() {
    let firstNode = this.head;
    while(firstNode !== null) {
      let thirdNode = firstNode;
      let secondNode = firstNode.next;
      // console.log('First node is: ', firstNode.value);
      while(secondNode !== null) {
        if (firstNode.value === secondNode.value) {
          thirdNode.next = secondNode.next;
          secondNode = secondNode.next;
        } else {
          thirdNode = thirdNode.next;
          secondNode = secondNode.next;
        }
      }
      firstNode = firstNode.next;
    }
  }

  /* So the problem with the above implementation is how the firstNode follows the secondNode */

  removeDuplicatesWithArray() {
    let firstNode = this.head;
    let secondNode = firstNode.next;
    let valueRecord = [];
    // important line to get it to work
    valueRecord.push(firstNode.value);
    while(secondNode !== null) {
      console.log('firstNode = ', firstNode.value, ' secondNode = ', secondNode.value);
      if (valueRecord.includes(secondNode.value)) {
        firstNode.next = secondNode.next;
        secondNode = secondNode.next;
      } else {
        valueRecord.push(secondNode.value);
        firstNode = firstNode.next;
        secondNode = secondNode.next;
      }
    }
  }

  removeMiddleNode = () => {
      let prevNode = this.head;
      let pointer = this.head;
      let runner = this.head;
      // if list length 1 remove head
      if (this.head === null || this.head.next === null) {
          this.head = null;
          return;
      }
      let counter = true;
      // else remove middle node
      while(runner.next !== null) {
          if (counter) {
              prevNode = pointer;
              pointer = pointer.next;
          }
          counter = !counter;
          runner = runner.next;
      }
      prevNode.next = pointer.next;
  }
  /* assumes that list has atleast k length */
  returnKthToLast(k) {
    let counter = k - 1;
    let nodeProbe = this.head;
    let node = this.head;
    while(counter > 0) {
      nodeProbe = nodeProbe.next;
      counter--;
    }
    while(nodeProbe.next !== null) {
      console.log('nodeProbe: ', nodeProbe.value);
      console.log('node: ', node.value);
      nodeProbe = nodeProbe.next;
      node = node.next;
    }
  }
  /* this works in a sneaky way by having the first node never checked for value but always put in the center so necessarily correct */
  partitionAround(element) {
    let node = this.head.next;
    let prevNode = this.head;
    while(node !== null) {
      if (node.value <= element) {
        prevNode.next = node.next;
        node.next = this.head;
        this.head = node
        node = prevNode.next;
      } else {
          prevNode = prevNode.next;
          node = node.next;
        }
      }
    }
}


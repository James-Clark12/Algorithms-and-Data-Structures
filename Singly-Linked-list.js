// Important thing to be aware of - the methods of this class will all fail/ behave unusually IF the linkedList is constructed
// without a value passed - the first element in the LL will be an empty object {value: undefined, next: null}

// working with this is possible but confusing - it is better to add a conditional in the constructor like: 

//     constructor(value) {
//         if (value !== undefined) {
//             const node = {value, next: null};
//             this.head = node;
//             node.next = null;
//         } else {
//             this.head = null;
//         }
//     }

class LinkedList {
  // value has to be passed to the constructor
  constructor(value) {
    const node = {value, next: null};
    this.head = node;
    node.next = null;
  }
  addToHead(value) {
    const node = {value, next: this.head};
    this.head = node;
  }
  printList() {
    let node = this.head;
    while(node !== null) {
      console.log(node.value);
      node = node.next;
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

  removeMiddleNode(nodeValue) {
    let firstNode = this.head;
    let secondNode = firstNode.next;
    while(secondNode.next !== null) {
      if (secondNode.value === nodeValue) {
        firstNode.next = secondNode.next;
        secondNode = secondNode.next;
      } else {
        firstNode = firstNode.next;
        secondNode = secondNode.next;
      }
    }
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


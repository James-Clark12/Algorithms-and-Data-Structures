# Linked List Toolkit

The following operations are crucial to know when answering Linked List questions:

1. Using Sentinels
2. Detecting a cycle in a Linked List
3. Detecting where the cycle begins
4. Detecting an intersection between two lists using Floyd
5. Reversing a linked list
6. Moving backwards through a list
7. Removing Nth node from a list
8. Sorting a linked list
9. Doing addition in a Linked List
10. Unstitching a single list
11. Reordering a list
12. Flatten an array with children
13. Partitioning around an element


## Using Sentinels

Sentinels are simple fake nodes that act as a pointer to the head of a list. Using the sentinel's head reference rather than having just a reference to the head simplifies a lot of small edge cases that can come about when the head of your list is changed in anyway. For no cost they add a lot of benefits.

Sentinel nodes are as simple as:

	const sentinel = {next: head}; 

## Detecting a Cycle in a Linked List

There is a very simple Algorithm for checking whether a cycle exists in a Linked List. It is called Floyd's algorithm or sometimes the Tortoise and the Hair algorithm. 

We simply initialize two pointers, the second of which we increment two steps for the every one step the first takes. If the two pointers ever point to the same node then we know there must be a cycle.

	const hasCycle = (head) => {
    
	    let tort = head;
	    let hare = head;
	    
	    while(hare !== null && hare.next !== null) {
	        tort = tort.next;
	        hare = hare.next.next;
	        if (hare === tort) {
	            return true;
	        }
	    }
	    return false;
	};

## Detecting the start of a Cycle in a Linked List

Finding the start of a cycle is also simple to do but explaining why it works is hard.

	var detectCycleStart = function(head) {
	   
	    let tort = head;
	    let hare = head;
	    let foundCycle = false;
	    
	    while(hare !== null && hare.next !== null) {
	        tort = tort.next;
	        hare = hare.next.next;
	        if (hare === tort) {
	            foundCycle = true;
	            break;
	        }
	    }
	    if (!foundCycle) {
	        return null;    
	    }
	    
	    // now that we know there is a cycle and have both pointers pointing
	    // at the same element.
	    // to detect the start of the cycle we simply set the hare/ runner
	    // back to head. And iterate the two pointers until they meet.
	    // where they meet is the start of the cycle
	    hare = head;
	    while(hare !== tort) {
	        hare = hare.next;
	        tort = tort.next;
	    }
	    return hare;
	};

## Detecting an intersection between two Linked Lists

There are a few ways of doing this. We could record each node in the two lists with a Hash Map and check for collisions. We could iterate through one of the lists for each node in the other checking if the node is shared.

It can be done in in O(N) time, 0(1) space however.

We maintain two pointers pApA and pBpB initialized at the head of A and B, respectively. Then let them both traverse through the lists, one node at a time.

When pApA reaches the end of a list, then redirect it to the head of B (yes, B, that's right), similarly when pBpB reaches the end of a list, redirect it the head of A.

If at any point pApA meets pBpB, then pApA/pBpB is the intersection node.

To see why the above trick would work, consider the following two lists: A = {1,3,5,7,9,11} and B = {2,4,9,11}, which are intersected at node '9'.

Since B.length (=4) < A.length (=6), pBpB would reach the end of the merged list first, because pBpB traverses exactly 2 nodes less than pApA does.

By redirecting pBpB to head A, and pApA to head B, we now ask pBpB to travel exactly 2 more nodes than pApA would. So in the second iteration, they are guaranteed to reach the intersection node at the same time.

If two lists have intersection, then their last nodes must be the same one. So when pApA/pBpB reaches the end of a list, record the last element of A/B respectively. If the two last elements are not the same one, then the two lists have no intersections.

	var getIntersectionNode = function(headA, headB) {

		if (headA === null || headB === null) {
			return null;
		}

		let nodeA = headA;
		let nodeB = headB;
		let Atail = null;
		let Btail = null;

		while(true) {
			if (nodeA === nodeB) {
				return nodeA;
			}
			if (Atail && Btail && Atail !== Btail) {
				return null;
			}
			if(nodeA.next === null) {
				Atail = nodeA;
				nodeA = headB;
			} else {
				nodeA = nodeA.next;
			}
			if (nodeB.next === null) {
				Btail = nodeB;
				nodeB = headA;
			} else {
				nodeB = nodeB.next;
			}
		}
	};

Alternatively we could use  Floyd cycle detection algorithm

1. If we linked the end of list A to B
2. Then if there is an intersection between the two we will have created a cycle
3. We can detect the cycle and where it starts using Floyd's algorithm (on just one of the LLs)
4. And where the cycle starts is where the two lists intersect

## Reversing a Linked List

### Iteratively

	var reverseListIteratively = (head) => {
	    if (head === null) return null;
	    let node = head;
	    let prev = null;
	    while(node !== null) {
		        let next = node.next;
		        node.next = prev;
		        prev = node;
		        node = next;
	    }
	    return prev;
	};

### Recursively

	var reverseListRecursively = (head) => {
	  
	    let newHead = null;
	    
	    const recurse = (node) => {
	        if (node !== null) {
	            let newPrevNode = recurse(node.next);
	            if (node) {
	                head.next = null;
	                if (newPrevNode) {
	                    newPrevNode.next = node;
	                } else {
	                    newHead = node;
	                }
	            }
	            return node;
	        }
	    }
	    recurse(head);
	    return newHead;
	};

## Moving backwards through a list

This is a really useful method that allows you to move backwards through a singly Linked List. This is great for anything that requires you to look at the front and end of a List at the same time.

	let pointer = head;

	const recurseBackwards = (node) => {

		if (node !== null) {
			recurseBackwards(node.next);
			// node will be the tail of the list, 
			// then the node before the tail and so on
			console.log(node);
			// we can iterate a pointer from the start of the list
			// using an external pointer variable here
			// and doing
			pointer = pointer.next;
		}

	}

## Remove Nth node from the end of the list

The best way to solve this is to use the common runner technique. This is where we have two pointers one which travels ahead of the over to fulfill some purpose.

Here the runner will travel N nodes ahead of the pointer, meaning that when the runner arrives at the end of the Linked List the pointer will be at the Nth node.

	var removeNthFromEnd = function(head, n) {

		if (!head) return null;

		let node = head;
		let sentinel = {next: head};
		let prev = sentinel;
		let runner = head;

		// put runner n ahead of node
		let counter = n;
		while(counter > 0) {
			runner = runner.next;
			counter = counter - 1;
		}

		// iterate runner to end of list
		// node will be n behind
		while(runner !== null) {
			runner = runner.next;
			prev = prev.next;
			node = node.next;
		}

		// cut out node as it is the length-n node
		prev.next = node.next;
		node.next = null;
		return sentinel.next;

	};

## Sorting a Linked List

This is actually far harder to code than it might initially seem.

### Insertion Sort

	const insertionSortList = head => {

		if (!head || !head.next) return head;

		const sentinel = { next: head };
		let prev = head;
		let curr = head.next;

		while (curr) {
			if (curr.val >= prev.val) {
				// in the correct place
				prev = curr;
				curr = curr.next;
			} else {

				const next = curr.next;
				let pos = sentinel;
				// iterate through the sorted part of the list to the first place
				// where a curr.val is less than a given node
				while (pos.next && pos.next !== curr && curr.val > pos.next.val) {
					pos = pos.next;
				}

				// if we have found a place for curr differnt from
				// where it already was - then move it there
				
				if (pos.next !== curr) {
					// enter curr.val just before that val which is greater than it
					curr.next = pos.next;
					pos.next = curr;
					prev.next = next;
					curr = next;
				}
			}
		}

		// prev now points to the end of the list so make sure it
		// doesnt point anywhere else
		prev.next = null;
		return sentinel.next;
	};

## Doing addition in a Linked List

	var plusNum = function(head, numToAdd=1) {

		if (head===null) return null;

		const sentinel = new ListNode(0, head);
		sentinel.prev = null;
		let prev = sentinel;
		head.prev = sentinel;
		let node = head;

		while(node !== null) {
			node.prev = prev;
			prev = node;
			node = node.next;
		}

		node = prev;
		let carry = numToAdd;

		while(true) {
			if (carry === 0) {
			if (sentinel.val !== 0) {
				return sentinel
			}
			return head;
		}

		if (node === null) {
			const newSentinel = new ListNode(0, sentinel);
			newSentinel.prev = null;
			sentinel = newSentinel;
			node = newSentinel;
		}

		let sum = node.val + carry;

		if (sum < 10) {
			node.val = sum;
			if (sentinel.val !== 0) {
				return sentinel
			}
			return head;
		}

		if (sum >= 10) {
			node.val = sum%10;
			carry = Math.floor(sum / 10);
			node = node.prev;
		}
	};
	
## Unstitching a single list

Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

Problem: [https://leetcode.com/problems/odd-even-linked-list/](https://leetcode.com/problems/odd-even-linked-list/)

[1,2,3,4,5] becomes [1,3,5,2,4]

	var oddEvenList = function(head) {

	    if (head === null) return null;
	    if (!head.next) return head;
	    
	    let odd = head;
	    let even = head.next;
	    let origEven = even;
	    
	    while(true) {

	        if (even && even.next) {
	            odd.next = even.next;        
	        } else {
	            odd.next = origEven;
	            break;
	        }

	        if (odd.next) {
	            even.next = odd.next.next;    
	            odd = odd.next;
	            even = even.next;
	        } else {
	            odd.next = origEven;
	            even.next = null;
	            break;
	        }
	    }
	    return head;
	};
	
## Reorder a Linked List

Given a singly linked list _L_: _L_0→_L_1→…→_L__n_-1→_L_n,  
reorder it to: _L_0→_L__n_→_L_1→_L__n_-1→_L_2→_L__n_-2→…

Problem: [https://leetcode.com/problems/reorder-list/](https://leetcode.com/problems/reorder-list/)

Here we can use techniques from above. We can reverse the second half of the list and then stitch using a runner or we can recurse backwards and forwards at the same time and stitch that way.

Below is an example of the latter:

	var reorderList = function(head) {
	    
	    if (!head) return head;

	    let pointer = head;
	    
	    const recurseBackwards = (node) => {
	        if (node !== null) {
	            recurseBackwards(node.next);
	            let pointerNext = pointer.next;
	            pointer.next = node;
	            node.next = pointerNext;
	            pointer = pointerNext;
	        }
	    }
	    
	    let length = 0;
	    let node = head;
	    while(node !== null) {
	        node = node.next;
	        length = length+1;
	    }
	    let middle = Math.ceil(length/2);
	    let counter = 0;
	    node = head;
	    while(counter !== middle) {
	        node = node.next;
	        counter = counter+1;
	    }
	    recurseBackwards(node);
	    pointer.next = null;
	    return head;
	};
	
## Flatten a Multilevel Doubly Linked List

You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.

Problem: [https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)

	var reorderList = function(head) {

	    if(head===null){
	        return null;
	    }
	    
	    let current = head;
	    
	    if(current.child){
	        let tail = findTail(current.child);
	        let nextNode = current.next;
	        current.next = current.child;
	        current.child.prev = current;
	        if(nextNode) nextNode.prev = tail;
	        tail.next = nextNode;
	        current.child = null;
	    }
	    
	    flatten(current.next)
	    
	    return head;
	};


	function findTail(node){
	        
	    while(node.next){
	        node = node.next;
	    }
	    return node;        
		
	}

## Partition around an element

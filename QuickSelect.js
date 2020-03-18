Cleaner iterative implementations are also possible - I like this version as it is only a few lines different from my quickSort algorithm.

Similar iterative alternative: https://stackoverflow.com/questions/38988384/quickselect-into-javascript

/* Quickselect is a selection algorithm to find the kth smallest element in an unordered list

// Essentially a combination of quick sort and binary search

Quickselect uses the same overall approach as quicksort, choosing one element as a pivot and
partitioning the data in two based on the pivot, accordingly as less than or greater than the pivot.
However, instead of recursing into both sides, as in quicksort, quickselect only recurses into one side
– the side with the element it is searching for. This reduces the average complexity from O(n log n) 
to O(n), with a worst case of O(n2).

So we use the quick sort method to partition around a middle value
but then just discard the half of the array we know is greater than the 
element we want 

This allows us to search an unsorted array in worst case O(n^2) time, 
average case O(n) time */
const printSegment = (array, left, right) => {
    const segment = [];
    for (let i = left; i<=right; i++) {
      segment.push(array[i]);
    }
      return segment;
    //console.log(segment);
  }
  
  const swap = (array, left, right) => {
      const temp = array[left];
      array[left] = array[right];
      array[right] = temp;
  }
  
  const partition = (array, left, right) => {
      const partitionValue = array[right];
      let newPartitionIndex = left;
      for(let i=left; i<right; i++) {
          if(array[i] < partitionValue) {
              swap(array, i, newPartitionIndex);
              newPartitionIndex = newPartitionIndex+1;
          }
      }
      swap(array, newPartitionIndex, right);
      return newPartitionIndex;
  }
  
  const quickSelect = (array, left, right, element) => {
      if (left <= right) {
          const partitionIndex = partition(array, left, right);
          if (array[partitionIndex] === element) {
              return partitionIndex;
          } else if (element > array[partitionIndex]) {
              return quickSelect(array, partitionIndex+1, right, element);
          } else {
              return quickSelect(array, left, partitionIndex-1, element);
          }
      }
      return -1;
  }
  
  const unsortedArray = [0, 1, 2, 4, 9, 12,14,222,6,-200,15,6,67777,124];
  
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 122));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 0));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, -200));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 2));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 67777));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 9));
  console.log(quickSelect(unsortedArray, 0, unsortedArray.length-1, 125));

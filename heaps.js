
// starting with the heap
// heap is a useful data structure for storing a queue like structure - giving access to the max or min values
// max or min can be satellite data or the key - has O(1) return and 0(h) insert where h is height

// Operations are: MaxHeapify, HeapInsert, IncreaseKey, HeapSort, BuildMaxHeap, Parent ,Left, Right

const Parent = (i) => {
  return Math.ceil(i/2 - 1);
}

const Left = (i) => {
  return (i*2) + 1;
}

const Right = (i) => {
  return (i*2) + 2;
}

const swap = (num1, num2, array) => {
    const temp = array[num1];
    array[num1] = array[num2];
    array[num2] = temp;
}

// ensures an element isnt higher than it should be by recursively checking an element against its children,
// and if it is smaller than them, swapping their position and doing the same check on the new position
const MaxHeapify = (array, i, heapSize = array.length) => {
  let l = Left(i);
  let r = Right(i);
  let largest = i;
  if (l < heapSize && array[l] > array[i]) {
    largest = l;
  }
  if (r < heapSize && array[r] > array[largest]) {
    largest = r;
  }
  if (i !== largest) {
    swap(i, largest, array);
    MaxHeapify(array, largest, heapSize);
  }
  return array;
}

const BuildMaxHeap = (array) => {
  for (let i=Math.ceil(array.length/2); i>-1; i--) {
    MaxHeapify(array, i);
  }
  return array;
}

const MinHeapify = (array, i, heapSize = array.length) => {
  let l = Left(i);
  let r = Right(i);
  let smallest = i;
  if (l < heapSize && array[l] < array[i]) {
    smallest = l;
  }
  if (r < heapSize && array[r] < array[smallest]) {
    smallest = r;
  }
  if (i !== smallest) {
    swap(i, smallest, array);
    MinHeapify(array, smallest, heapSize);
  }
  return array;
}

// Only calling the heapify operation of the first half of the does make sense when you think of the array
// structure - but should consider the mathematical definition of what proporition of the array needs to be
// called on in order to ensure that the comparisons are complete
const BuildMinHeap = (array) => {
  for (let i=Math.ceil(array.length/2); i>-1; i--) {
    MinHeapify(array, i);
  }
  return array;
}

const IncreaseKey = (array, i, newValue) => {
  if (newValue < array[i]) {
    return 'Value is smaller';
  }
  array[i] = newValue;
  while (array[i] > array[Parent(i)] && i > 0) {
    swap(i, Parent(i), array);
    i = Parent(i);
  }
}

const DecreaseKey = (array, i, newValue) => {
  if (newValue > array[i]) {
    return 'Value is larger';
  }
  array[i] = newValue;
  while (array[i] < array[Parent(i)] && i > 0) {
    swap(i, Parent(i), array);
    i = Parent(i);
  }
}

const HeapMaxSort = (array) => {
  BuildMaxHeap(array);
  console.log(array);
  let heapSize = array.length - 1;
  while (heapSize > 2) {
    swap(0, heapSize, array);
    heapSize = heapSize - 1;
    console.log('Heapsize is: ', heapSize);
    MaxHeapify(array, 0, heapSize);
  }
  swap(0, 1, array);
  return array;
}

const HeapMinSort = (array) => {
  BuildMinHeap(array);
  console.log(array);
  let heapSize = array.length - 1;
  while (heapSize > 2) {
    swap(0, heapSize, array);
    heapSize = heapSize - 1;
    console.log('Heapsize is: ', heapSize);
    MinHeapify(array, 0, heapSize);
  }
  swap(0, 1, array);
  return array;
}

const ExtractMax = (array) => {
  swap(0, array.length-1, array);
  const max = array[array.length - 1];
  array.length = array.length - 1;
  MaxHeapify(array, 0, array.length - 1);
  return max;
}

const ExtractMin = (array) => {
  console.log(array[0], '  ,', array[array.length-1]);
  console.log(array);
  swap(0, array.length-1, array);
  console.log(array);
  const min = array[array.length - 1];
  console.log('min is: ', min);
  array.length = array.length - 1;
  MinHeapify(array, 0, array.length - 1);
  return min;
}

const insertMinHeap = (element, array) => {
  array[array.length] = Infinity;
  DecreaseKey(array, array.length-1, element);
}

const insertMaxHeap = (element, array) => {
  array[array.length] = -Infinity;
  IncreaseKey(array, array.length-1, element);
}

const unsorted = [4,7,1,4,9,2,4];
const minHeap = BuildMinHeap(unsorted);
console.log('minHeap is: ', minHeap);
insertMinHeap(0, minHeap);
console.log('minHeap is: ', minHeap);
insertMinHeap(-2, minHeap);
console.log('minHeap is: ', minHeap);
insertMinHeap(1, minHeap);
console.log('minHeap is: ', minHeap);
console.log(ExtractMin(minHeap));

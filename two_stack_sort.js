
const twoStackSort = (toBeSorted) => {
    console.log('array toBeSorted is: ', toBeSorted);
    const tempStack = [];
    // this works by forcing large variables to float to the top of the stack
    // meaning that once this is complete we can flip the stack and have the stack
    // sorted from small to large
    // drawing out the process helps understand it
    while(toBeSorted.length>0) {
        let temp = toBeSorted.pop();
        console.log('toBeSorted is: ', toBeSorted);
        console.log('tempStack is: ', tempStack);
        console.log('temp is: ', temp);
        while(tempStack.length!==0 && tempStack[tempStack.length-1]>temp) {
            toBeSorted.push(tempStack.pop());
        }
        tempStack.push(temp);
    }
    // flip results back from tempStack to toBeSorted
    console.log('f toBeSorted is: ', toBeSorted);
    console.log('f tempStack is: ', tempStack);
    while(tempStack.length>0) {
        toBeSorted.push(tempStack.pop());
    }

    // The process above of floating largest to the top must be done
    // iteratively to completely sort - below we check if the list is
    // sorted and if not call our sort method again
    let largest = Infinity;
    for(let i=0; i<toBeSorted.length; i++) {
        if (toBeSorted[i] > largest) {
            return twoStackSort(toBeSorted);
        } else {
            largest = toBeSorted[i];
        }
    }
    return toBeSorted;
}

console.log(twoStackSort([0,2,12,1,9,4])); //returns [ 12, 9, 4, 2, 1, 0 ]

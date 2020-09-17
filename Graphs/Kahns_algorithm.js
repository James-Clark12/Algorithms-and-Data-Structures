// https://leetcode.com/problems/course-schedule-ii/

// https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/

// Very intuitive - wrote the below before knowing about the algorithm

var findOrder = function(numCourses, prerequisites) {
  
    const returnArray = [];
    const visited = new Set();
    const courseMap = {};
    
    for(let i=0; i<numCourses; i++) {
        courseMap[i] = [];
    }
    for([course, prerequisite] of prerequisites) {
        courseMap[course].push(prerequisite);
    }
    
    let edited = true;
    while(edited) {
        edited = false;
        [...Object.keys(courseMap)].forEach(key => {
            if (!visited.has(key)) {
                if (courseMap[key].length === 0) {
                    visited.add(key);
                    edited = true;
                }
                courseMap[key] = courseMap[key].filter(prerequisite => {
                    if (!visited.has(`${prerequisite}`)) {
                        return true;
                    } else {
                        edited = true;
                        return false;
                    }
                })
            }
        })
    }
    return visited.size === numCourses ? [...visited.values()] : [];
};

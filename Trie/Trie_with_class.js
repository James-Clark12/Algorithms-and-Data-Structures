class TrieNode {
    constructor(key='') {
        // the "key" value will be the character in sequence
        this.key = key;
        // the "satellite" - stores any satellite data
        this.satellite = {};
        // we keep a reference to parent
        this.parent = null;
        // we have hash of children
        this.children = {};
        // check to see if the node is at the end
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert = (word) => {   
        let node = this.root; 
        // for every character in the word
        for(var i = 0; i < word.length; i++) {
          // check to see if character node exists in children.
          if (!node.children[word[i]]) {
            // if it doesn't exist, we then create it.
            node.children[word[i]] = new TrieNode(word[i]);
            
            // we also assign the parent to the child node.
            node.children[word[i]].parent = node;
          }
          
          // proceed to the next depth in the trie.
          node = node.children[word[i]];
          
          // finally, we check to see if it's the last word.
          if (i == word.length-1) {
            // if it is, we set the end flag to true.
            node.end = true;
          }
        }
    }

    contains = (word) => {
        let node = this.root;
        // for every character in the word
        for(var i = 0; i < word.length; i++) {
          // check to see if character node exists in children.
          if (node.children[word[i]]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[word[i]];
          } else {
            // doesn't exist, return false since it's not a valid word.
            return false;
          }
        }
        
        // we finished going through all the words, but is it a whole word?
        return node.end;
    }

    find = (prefix) => {
        var output = [];
        let node = this.root;

        // for every character in the prefix
        for(var i = 0; i < prefix.length; i++) {
          // make sure prefix actually has words
          if (node.children[prefix[i]]) {
            node = node.children[prefix[i]];
          } else {
            // there's none. just return it.
            return output;
          }
        }
        
        // recursively find all words in the this.root
        this.findAllWords(node, output);
        console.log('found: ');
        return output;
    }

    findAllWords(node, arr) {
        // base case, if node is at a word, push to output
        if (node.end) {
          // push whole word to arr
          arr.unshift(this.getWord(node));
        }
        
        // iterate through each children, call recursive findAllWords
        for (var child in node.children) {
          this.findAllWords(node.children[child], arr);
        }
    }

    getWord = function(node) {
        var output = [];
        
        while (node !== null) {
          output.unshift(node.key);
          node = node.parent;
        }
        return output.join('');
    }

    remove = function(word) {
        if (!word) return null;
        var node = this.root;
        const chain = [];
        // traverse down trie
        for (let i = 0; i < word.length; i++) {
          if (node.children[word[i]]) {
            // we want all nodes accessible in chain
            // so we can move backwards and remove dangling nodes
            chain.push(node);
            node = node.children[word[i]];
          } else {
            // word is not in the trie
            return null;
          }
        }
    
        // if any children, we should only change end flag
        if (Object.keys(node.children).length) {
          node.end = false;
          return node;
        }
    
        // zero children in node
        // continue untill we hit a breaking condition
        let child = chain.length ? chain.pop() : null; // whatever node was
        let parent = chain.length ? chain.pop() : null; // if node has parent
    
        while (true) {
          // remove child
          child && parent && delete parent.children[child.key];
    
          // if more children or chain is empty, we're done!
          if (
            Object.keys(parent.children).length ||
            !chain.length
          ) {
            node.end = false;
            return node;
          }
          // otherwise, we have no more children for our parent and we should keep deleting nodes
          // our next parent is what we pop from the chain
          // our child is what our parent was
          child = parent;
          parent = chain.pop();
        }
    }
}

  // instantiate our trie
  var trie = new Trie();
  
  // insert few values
  trie.insert("hello");
  trie.insert("helium");
  trie.insert("kickass");
  trie.insert("kickassed");
  trie.insert("kickasses");
  
  // check contains method
  console.log(trie.contains("helium"));  // true
  console.log(trie.contains("kickass")); // false
  console.log(trie.contains("faf")); // false
  // check find method
  console.log(trie.find("hel"));  // [ 'helium', 'hello' ]
  console.log(trie.find("hell")); // [ 'hello' ]
  console.log(trie.find("h")); // [ 'hello' ]
  console.log(trie.find(""));
  trie.remove('helium');
  trie.remove('hello');
  console.log(trie.find(""));
  trie.remove('kickass');
  console.log(trie.find(""));

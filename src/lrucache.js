class LRUCache {
  constructor(limit){
    this.size = 0; 
    if (typeof limit === 'number'){
      this.limit = limit;
    } else {
      this.limit = 12; 
    }
    this.map = {}; 
    this.head = null; 
    this.tail = null; 
  }

  makeLRUNode(key, value) {
     var node = {}; 
     node.next = null; 
     node.value = value; 
     node.key = key; 
     node.prev = null; 
     return node; 
  }

  setHead(node){
    if (this.size === 0){
      this.head = this.tail = node; 
    } else {
      var temp = this.head; 
      node.next = temp; 
      temp.prev = node; 
      this.head = node; 
    }
  }

  get(key){
    if (!this.map[key]){
      return `sorry, key ${key} does not exist!`; 
    } else {
      var node = map[key]; 
      var value = node.value; 
      node.prev.next = node.next; 
      node.next.prev = node.prev; 
      this.setHead(node); 
      return value; 
    }
  }

  set(key, value){
    var node = this.makeLRUNode(key, value); 
    if (this.map[key]){
      this.map[key] = node; 
      node.prev.next = node.next;
      node.next.prev = node.prev; 
      this.setHead(node);  
    } else {
      this.map[key] = node; 
      this.setHead(node); 
      this.size++; 
      if (this.size > this.limit){
        this.removeTail(); 
      }
    }
  }

  removeTail(){
    var oldTail = this.tail;
    var newTail = this.tail.prev; 
    delete this.map[oldTail.key]; 
    newTail.next = null; 
    this.tail = newTail;
    this.size--;  
  }

  remove(key){
    if (!this.map[key]){
      return `Sorry, key ${key} does not exist`; 
    } else {
      var node = this.map[key]; 
      var val = node.value; 
      if (this.head === node){
        var newHead = this.head.next; 
        newHead.prev = null; 
        delete this.map[key]; 
        this.head = newHead; 
      } else if (this.tail === node){
        var newTail = this.tail.prev; 
        newTail.next = null; 
        delete this.map[key];
        this.tail = newTail; 
      } else {
        node.prev.next = node.next; 
        node.next.prev = node.prev; 
        delete this.map[key]; 
      }
      this.size--; 
      return val; 
    }
  }
}


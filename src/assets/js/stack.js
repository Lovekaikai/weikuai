const stack = {
  dataStore: [],
  top: 0,
  // 注意++操作符的位置，它放在this.top的后面，这样新入栈的元素就被放在top的当前位置对应的位置，同时top自加1，指向下一个位置
  push: function(element) {
    this.dataStore[this.top++] = element
  },
  // 返回栈顶元素，同时top的位置减1
  pop: function() {
    return this.dataStore[--this.top]
  },
  // peek()方法返回数组的第top-1个位置的元素，即栈顶元素
  peek: function() {
    return this.dataStore[this.top - 1]
  },
  // 将top的值设置0，即清空一个栈
  clear: function() {
    this.top = 0
  },
  // 返回变量top的值即为栈内元素的个数
  length: function() {
    return this.top
  },
  // 输出栈内元素
  printElement: function() {
    while (this.top > 0) {
      document.writeln(this.pop() + '&nbsp;&nbsp;')
    }
  }
}

export default stack

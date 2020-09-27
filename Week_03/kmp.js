function kmp(source, pattern) {
  // 1. 计算table
  let table = new Array(pattern.length).fill(0);
  console.log('table: ', table);

  {
    let i = 1; j = 0;

    while(i < pattern.length) {
      if(pattern[i] === pattern[j]) {
        i++, j++;
        table[i] = j;
      } else {
        if (j > 0){
          // 为什么？
          j = table[j]; 
        } else {
          i ++;
        }
      }
    }
  }

  {
    let i = 0, j = 0;

    while(i < source.length) {
      if(source[i] === pattern[j]) {
        i++, j++;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          i++;
        }
      }
      if(j == pattern.length) return true;
    }
    return false;

  }

}

console.log(kmp('abcdabce', 'abce'));

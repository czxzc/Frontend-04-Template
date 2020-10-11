function find(source, pattern) {
  let starCount = 0; // *的数量

  // 1. 计算*的数量
  for(let i = 0; i < pattern.length; i++) {
    if(pattern[i] === '*') starCount++;
  }
  
  // 2. 处理没有*的情况
  if(starCount === 0) {
    for(let i = 0; i < pattern.length; i++) {
      if(pattern[i] !== source[i] && pattern[i] !== '?') return false;
    }
    return true;
  }

  let i = 0;
  let lastIndex = 0;

  // 3. 处理开头的匹配(第一个*之前)
  for(i = 0; pattern[i] !== '*'; i++) {
    if(pattern[i] !== source[i] && pattern[i] !== '?') return false;
  }

  lastIndex = i;


  // 4. 处理中间的一个*加一段字符串组成的每一组的匹配
  for(let p = 0; p < starCount-1; p++) {
    i++;
    let subPattern = '';
    while(pattern[i] !== '*') {
      subPattern += pattern[i];
      i++;
    }

    //将？替换为正则的[\\s\\S]
    let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), 'g');
    reg.lastIndex = lastIndex;

    if(!reg.exec(source)) return false;

    lastIndex = reg.lastIndex;
  }

  // 5. 处理结尾段,从后往前循环匹配
  for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
    if(pattern[pattern.length - j] !== source[source.length - j] && 
      pattern[pattern.length - j] !== '?') return false;
  }

  return true;
}
// console.log(find('abcabcabxaac', 'a*b*bx*c'));
// console.log(find('abcabcabxaac', 'a*b?*b?x*c'));
console.log(find('abcabcabxaac', 'abcabcab'));
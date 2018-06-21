export default (size,query) => {
  const sizeArr = String(size).split('');
  const lastIndex = sizeArr.length - 1;
  let string = 'результатов';
  if(Number(sizeArr[lastIndex]) === 1) {
    string = 'результат';
  }
  else if(sizeArr[lastIndex] > 1 && sizeArr[lastIndex] < 5) {
    string = 'результата';
  }
  return `По запросу "${query}" найдено ${size} ${string}`;
}
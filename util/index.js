//将小于10的数字前面加个0
function twoFix(num) {
  let temp = num;
  if(parseInt(temp) < 10) {
    temp = '0' + temp;
  }
  return temp;
}

//获取日期
export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // console.log(`${year}/${month}/${day}  ${hour}:${minutes}:${seconds}`);
  //将不足两位数的数字前面补个0
  return `${year}/${twoFix(month)}/${twoFix(day)} ${twoFix(hour)}:${twoFix(minutes)}:${twoFix(seconds)}`;
}

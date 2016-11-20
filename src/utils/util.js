
// const utils = {
//
// delay :function(timeout){
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }
//
// }
//
//
// export default utils;

 export function delay(timeout) {
   return new Promise(resolve => {
     setTimeout(resolve, timeout);
   });
 }

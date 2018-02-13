var moment=require('moment');
var createdAt=1234567;
var date=moment(createdAt);
// date.add(100,'year').subtract(9,'months');
// console.log(date.format());
console.log(date.format('h:mm a'));
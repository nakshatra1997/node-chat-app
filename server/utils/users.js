[{
	id:'',
	name:'',
	room:''
}]


//addUser(room,name,id)
//removeUser(id)
//getUser(id)
//getUserList(room)
class Users
{
	constructor()
	{
		this.users=[];
	}
	addUser(id,name,room)
	{
      var user={id,name,room};
      this.users.push(user);
      return user;
	}
	removeUser(id)
	{ 
		var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
	}
	getUser(id)
	{
       var guser= this.users.filter((user)=>{
             if(user.id===id)
             {
                 return user;
             }
             
       });
       return guser;
	}
	getUserList(room)
	{
      var users=this.users.filter((user)=>{
         return user.room===room;
      });
      //now convert the array of ibjects to strings
      //we will use map for this
      var namesArray=users.map((user)=>{
        return user.name;
      });
      return namesArray;
	}
}
module.exports={Users};



// class Person {
//    constructor(name,age)
//    {
//       this.name=name;
//       this.age=age;
//    }
// }
// var me=new Person('nakshatra',25);
// console.log('me.name');
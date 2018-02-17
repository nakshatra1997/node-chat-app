const expect=require('expect');
const {Users}=require('./users');

describe('users',()=>
	{
		var users;
		beforeEach(()=>{
			users=new Users();
			users.users=[{
				id:'1',
				name:'np',
				room:'node'
			},
			{
				id:'2',
				name:'np1',
				room:'angular'
			},
			{
				id:'3',
				name:'np2',
				room:'node'
			}];
		});
		test('it should add new user',()=>{
			var users=new Users();
			var user={
				id:'123',
				name:'nakshatra',
				room:'chamber of secrets'
			};

           var resUser=users.addUser(user.id,user.name,user.room);
           expect(users.users).toEqual([user]);
           // console.log(users.getUser(user.id));
		});

		test('it should return names for node ',()=>{
			var userList=users.getUserList('node');
			expect(userList).toEqual(['np','np2']);
		});

		test('it should return names for angular ',()=>{
			var userList=users.getUserList('angular');
			expect(userList).toEqual(['np1']);
		});

		test('it should remove a user',()=>{
			var userId='1';
			var user=users.removeUser(userId);
			expect(user[0].id).toBe(userId);
			expect(users.users.length).toBe(2);
		});

		test('it should not remove a user',()=>{
			var userId='11';
			var user=users.removeUser(userId);
			expect(user).toEqual([]);
			expect(users.users.length).toBe(3);
		});


		test('it should find a user',()=>{
			var userId='2';
		
			var user=users.getUser(userId);
			// console.log(user);
			expect(user[0].id).toBe(userId);
		});

		test('should not a find user',()=>{
			var userId='21';
			var user=users.getUser(userId);
			console.log(user);
			expect(user).toEqual([]);
		});
	});
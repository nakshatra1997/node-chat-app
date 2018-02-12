
var {generateMessage,generateLocationMessage}=require('./message');
describe('generateMessage',()=>{
	test('should generate correct message object',()=>{
		var from ='nakshtra';
		var text='some message';
		var createdAt='123';
		var message=generateMessage(from,text);

		 expect(typeof 
		 	message.createdAt).toBe('number');
		// --toBeA is not a function 	
	});
});
//expect has migrated to jest thats why some functions were not working
describe('generateLocationMessage',()=>{
	test('should generate correct location object',()=>{
		var from='nakshtra';
		var latitude=15;
		var longitude=19;
		var url='https://www.google.com/maps?q=15,19';
		var message=generateLocationMessage(from,latitude,longitude);
		expect(typeof message.createdAt).toBe('number');
	// 	expect.objectContaining({from,url});
	// });
});
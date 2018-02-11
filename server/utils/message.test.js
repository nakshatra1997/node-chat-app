
var {generateMessage}=require('./message');
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
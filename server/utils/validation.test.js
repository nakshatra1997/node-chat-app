const expect=require('expect');
const{isRealString}=require('./validation');

describe('isRealString',()=>{
	test('should reject non-string values',()=>{
		var res=isRealString(98);
		expect(res).toBe(false);
	});

	test('should reject string with only spaces',()=>{
		var res=isRealString('   ');
		expect(res).toBe(false);
	});

	test('should allow string with non space characters',()=>{
		var res=isRealString(' nakshtra   ');
		expect(res).toBe(true);
	});
});
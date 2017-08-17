const assert = require('assert');
//nodejs에서 제공하는 aseert 모듈


var argv = require('yargs').argv;  
console.log('%d + %d = %d', argv.x, argv.y, argv.x+argv.y);


/*
const calc = require('./calc.js');

describe('Calculator Tests', function() {
	describe('Addition Tests', function() {
		it('returns 1 + 1 = 2', function(done) {
			assert.equal(calc.add(1, 1), 2);
			done();
		});

		it('returns 1 + -1 = 0', function(done) {
			assert.equal(calc.add(1, -1), 0);
			done();
		});
	});

	describe('Multiplication Tests', function() {
		it('returns 2 * 2 = 4', function(done) {
			assert.equal(calc.mul(2, 2), 4);
			done();
		});

		it('returns 0 * 4 = 4', function(done) {
			assert.equal(calc.mul(2, 2), 4);
			done();
		});
	});
});


describe('비동기 코드 테스트', function () {
	describe('#setTimeout', function () {
		it('2초 이내에 완료되지 않으면 실패', function (done) {
			setTimeout(function () {
				done();
			}, 3000);
		});
	});
});

//npm test test1 -t 10000하고 해야만 10초 내로 끝났을 때 ok를 먹는다
// 기본적으로는 2초까지는 된다.


//Hooks
// 테스트 케이스마다 반복해서 먼저 설정되어야 하는 부분이나, 테스트를 마치고
// 초기화가 필요할 때 아래와 같은 메서드를 사용할 수 있다.
describe('다양한 hooks 방법', function() {
	it('11', function(){
		assert.equal(1, 1 != -1);
	});

	it('33', function(){
		assert.equal(1, 1 != -1);
	});
	it('44', function(){
		assert.equal(1, 1 != -1);
	});
	before(function() {
		// 이 블록 내의 테스트들은 실행하기에 앞서 한번 실행되는 부분
		console.log('1');
	});

	after(function() {
		// 이 블록 내의 테스트들을 모두 실행한 후에 한번 실행되는 부분
		console.log('2');
	});

	beforeEach(function() {
		// 이 블록 내의 각 테스트들이 실행되기 전에 실행
		console.log('3');
	});

	afterEach(function() {
		// 이 블록 내의 각 테스트들이 실행된 후에 실행
		console.log('4');
	});

	it('22', function(){
		assert.equal(1, 1 != -1);
	});
  // test cases 이 안에 써야함
});
// mocha --reporter [opt] 을 통해 여러가지 출력 결과 포맷을 결정할 수 있다.

*/

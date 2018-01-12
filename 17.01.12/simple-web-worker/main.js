var first = document.querySelector('#number1');
var second = document.querySelector('#number2');

var result = document.querySelector('.result');

if (window.Worker) { // Check if Browser supports the Worker api.
	// Requires script name as input
	var myWorker = new Worker("worker.js");

// onkeyup could be used instead of onchange if you wanted to update the answer every time
// an entered value is changed, and you don't want to have to unfocus the field to update its .value

	first.onchange = function() {
		console.log(myWorker);
	  myWorker.postMessage([first.value,second.value]); // Sending message as an array to the worker
	  console.log('Message posted to worker');
	};

	second.onchange = function() {
	  myWorker.postMessage([first.value,second.value]);
	  console.log('Message posted to worker');
	};
console.log(myWorker)
	myWorker.onmessage = function(e) {
		result.textContent = e.data;
		console.log('Message received from worker');
	};
}

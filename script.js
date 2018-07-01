class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }
	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}
	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}
	stop() {
		this.running = false;
		clearInterval(this.watch);
	}
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }	
	resetCount() {
		this.reset();
		this.print();
	}
	print() {
        this.display.innerText = this.format(this.times);
	}		
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	save() {
        this.addTimeToList(this.format(this.times), resultList);
    }
	addTimeToList(time, resultList) {
        let element = document.createElement('li');
        element.innerText = time;
        resultList.appendChild(element);
    }

	clear() {	
		return resultList.innerText = '';
	}
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetCount());

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var resultList = document.querySelector('.results');
class Stopwatch extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			running: false,
			time: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			resultList: []
		}
    }
	start() {
		if (!this.state.running) {
			this.set({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	step() {
		if (!this.state.running) return;
		this.calculate();
	}
	calculate() {
		let {minutes, secons, miliseconds} = this.state.times;
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
		if(this.state.running){
			this.set({
				running: false
			});
			clearInterval(this.watch);
		}		
	}
    reset() {
		this.set({
			times: {
				minutes: 0,
				second: 0,
				millisecond: 0
			}
		});
    }	
	resetCount() {
		if (this.state.running){
			this.reset();
		}	
	}
	print() {
        this.display.innerText = this.state.times;
	}		
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	save() {
        this.addTimeToList(this.state.times);
    }
	addTimeToList(time) {
        this.setState((prevState, props) => ({
            resultList: [...prevState.resultList, {'time': time, 'id': new Date().getTime()}]
        }));
    }

	clear() {	
		return resultList.innerText = '';
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

    render() {
        return (
            <div>
                <div className='controls'>
                    <a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
                    <a href='#' className='button' onClick={this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button' onClick={this.zero.bind(this)}>Reset</a>
                    <a href='#' className='button' onClick={this.save.bind(this)}>Save</a>
                    <a href='#' className='button' onClick={this.clear.bind(this)}>Clear</a>
                </div>
                <div>{this.format(this.state.times)}</div>
                <ol className="results">
                    {this.state.resultList.map(item => <li key={item.id}>{item.time}</li>)}
                </ol>
            </div>
        );
    }
}



ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'));
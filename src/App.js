import React, {Component} from 'react';
import {createStore} from './redux';

const initialState = { count: 0 };

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + action.amount };
    case 'DECREMENT': return { count: state.count - action.amount };
    case 'RESET'    : return { count: 0 };
    default         : return state;
  }
}

function increment(amount) { //определили ф-ции вместо констант
  return { type: 'INCREMENT', amount}; // такие ф-ции в redux наз. action creators(создатели действий); лучше их вынести в отдельный файл
}

function decrement(amount) {
  return { type: 'DECREMENT', amount };
}

function reset(amount) {
  return { type: 'RESET'};
}

const store = createStore(reducer, initialState);

class Counter extends Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
      store.subscribe(() => this.forceUpdate());
    }

    increment() {
      const amount = parseInt(this.refs.amount.value || 1); //перевели строку в число
      store.dispatch(increment(amount)); // в dispatch, все так же, отправляются обьекты, но уже возвращаемые ф-циями
    }

    decrement() {
      const amount = parseInt(this.refs.amount.value || 1); 
      store.dispatch(decrement(amount));  
    }

    reset() {
      store.dispatch(reset());  
    }

    render() {
      const count = store.getState().count; 
        return (
          <div className = 'counter'>
              <span className = 'count'>{count}</span>

              <div className = "buttons">
                  <button className = "decrement" onClick = {this.decrement}>-</button>
                  <button className = "reset" onClick = {this.reset}>R</button>
                  <button className = "increment" onClick = {this.increment}>+</button> 
              </div>
              <input type='text' ref='amount' defaultValue='1' /> 
          </div>
        ); // добавили input 
    }
} 

export default Counter;

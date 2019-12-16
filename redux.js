
function updateState(state, action) {
    if (action.type === 'INCREMENT') {
        return state + action.amount;
    } else if (action.type === 'DECREMENT') {
        return state - action.amount;
    } else {
        return state;
    }
}

class Store { 
    constructor(updateState, state) { 
        this._updateState = updateState; 
        this._state = state; 
        this._callbacks = []; // тут зберігатимемо список всіх колбеків
    }

    get state() {
        return this._state;
    }
    
    update(action) { 
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(callback => callback()); // store викликає ф-ції callback для всіх частин апп, які підписані на зміну state
    } // не передаємо ніяких параметрів у ці ф-ції ^ , бо ми лише повідомляємо підписників про зміну стану
    
    subscribe(callback) { // підписка на зміну state (всі частини апп, які мусять знати про зміну state передадуть в Store ф-цію зворотнього виклику)
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback); // видаляє з масиву передану раніше ф-цію
    } // тобто вертає функцію відписки
}

const store = new Store(updateState, 0);

const incrementAction = { type: 'INCREMENT', amount: 5 };
const decrementAction = { type: 'DECREMENT', amount: 3 };

const unsibscribe = store.subscribe(() => console.log('State changed 1:', store.state)); // перший підписник
store.subscribe(() => console.log('State changed 2:', store.state)); // другий підписник

store.update(incrementAction);
unsibscribe(); // перший підписник відписався від змін стану після першої зміни
store.update(decrementAction);
store.update({});

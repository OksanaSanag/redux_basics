// let state = 0; видалили

function updateState(state, action) {
    if (action.type === 'INCREMENT') {
        return state + action.amount;
    } else if (action.type === 'DECREMENT') {
        return state - action.amount;
    } else {
        return state;
    }
}

class Store { //ховаємо стан аппки від загального доступу за допомогою классу
    constructor(updateState, state) { // <- state передається параметром, бо його буде визначати користувач
        this._updateState = updateState; //ф-цію передаємо параметром, а не методом, щоб не прив'язувати клас до конкретного випадку (до ф-ції нашого лічильника) 
        this._state = state; //назви особистих властивостей починаються з _ , їх краще не чіпати потім
    }

    get state() {// визначаєм геттер для того, щоб мати доступ до зміни state
        return this._state;
    }
    update(action) { //метод, за допомогою якого можна буде взаємодіяти зі станом. Метод не вертає зн-ня state, він лише каже Store, що відбулася якась дія і що state треба змінити
        this._state = this._updateState(this._state, action)
    }
}

const store = new Store(updateState, 0);

const incrementAction = { type: 'INCREMENT', amount: 5 };
const decrementAction = { type: 'DECREMENT', amount: 3 };

store.update(incrementAction); //видалили змінну state = , змінили updateState на метод store.update, і прибрали аргумент state
console.log(store.state);

store.update(decrementAction);
console.log(store.state);

store.update({});
console.log(store.state); 

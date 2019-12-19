export function createStore(reducer, initialState) {
    let state = initialState;
    let callbacks = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        callbacks.forEach( (callback) => callback() );
    }

    const subscribe = (callback) => {
        callbacks.push(callback);
        return () => callbacks.filter( (cb) => cb !== callback );
    };

    dispatch({}); // чтоб, к моменту вывода компонента, обьект состояния был бы уже определен

    return {getState, dispatch, subscribe};
}
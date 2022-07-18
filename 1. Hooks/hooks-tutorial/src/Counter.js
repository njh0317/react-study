import React, { useReducer } from "react";

function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { value: state.value + 1};
    case 'DECREMENT':
      return { value: state.value - 1};
    default:
      return state;
  }
}
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, {value:0}); 
  // 첫 번째 파라미터 리듀서 함수
  // 두 번째 파라미터에는 해당 리듀서의 기본 값

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>.
      </p>

      <button onClick={() => dispatch({type: 'INCREMENT'})}>+1</button>
      <button onClick={() => dispatch({type: 'DECREMENT'})}>-1</button>
    </div>
  );
};

export default Counter;

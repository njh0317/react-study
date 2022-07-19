# 최적화

## 느려지는 원인 분석

### 컴포넌트가 리렌더링 되는 상황

1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 변경될 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate 함수가 실행될 때

## React.memo를 사용해 컴포넌트 성능 최적화

- 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화함
- 컴포넌트를 만들고 나서 감싸면 된다.
  ```js
  const TodoListItem= ({todo, onRemove, onToggle}) => {
    ...
  }
  export default React.memo(TodoListItem);
  ```
  -> TodoListItem 컴포넌트는 todo, onRemove, onToggle 이 바뀌지 않으면 리렌더링 하지 않는다.

## 함수가 바뀌지 않게 하기

아래 함수들은 todos 배열이 업데이트되면 함수도 새롭게 바뀐다.

```js
const onRemove = useCallback(
  (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  },
  [todos]
);

const onToggle = useCallback(
  (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  },
  [todos]
);
```

### useState의 함수형 업데이트 기능

함수형 업데이트 : useState에 두번 째 파라미터를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣는다.

```js
const [number, setNumber] = useState(0);
const onIncrease = useCallback(
  () => setNumber(prevNumber => prevNumber+1);
  [],
);
//setNumber(number+1)
```

- 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어준다.
- useCallback 을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지않아도 된다.

```js
const onRemove = useCallback((id) => {
  setTodos((todos) => todos.filter((todo) => todo.id !== id));
}, []);

const onToggle = useCallback((id) => {
  setTodos((todos) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
  );
}, []);
```

- setTodos를 사용할 때 그 안에 todos => 만 넣어주면 된다.

### useReducer를 사용

```js
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.co
...
const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

//함수에서 dispatch({type:'INSERT'}, todo); 와 같이 호출
```

- useReducer의 두 번째 파라미터에 undefined를 넣고 세 번째 파라미터에 초기 상태를 만드는 함수를 넣어주면, 컴포넌트가 맨 처음 렌더링될 때만 해당 함수가 호출된다.

## 불변성 중요성

### 불변성을 지킨다.

라는 의미는 기존의 값을 직접 수정하지 않으며서 새로운 값을 만들어 내는 것을 말한다.

- 불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것 감지 못한다.(React.memo 에서 비교해 최적화 하는 것 불가)

* 전개 연산자(...문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사이다.
  - 즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다.
  - 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 한다.

```js
const nextComplexObject = {
  ...complexObject,
  objectInside: {
    ...complexObject.objectInside,
    enable: false,
  },
};
```

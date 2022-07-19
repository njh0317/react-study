# Hooks

## useState

```js
const [value, setValue] = useState(0);
```
- useState 안에는 상태의 기본값(0)
- 함수 호출 결과는 [상태 값, 상태를 설정하는 함수]
- useState 함수는 하나의 상태 값만 관리, 관리해야 할 상태가 여러 개면 useState를 여러 번 사용하면 된다.

## useEffect
리액트 컴포넌트가 렌더링될 때마다 특정 작업 수행하도록 설정가능

`componentDidMount` + `componentDidUpdate`

+ 그냥 useEffect 쓰면 업데이트 될 때마다 호출됨
+ 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐
  + 마운트 될 때만 실행하고 싶으면(맨 처음 렌더링 될 때만) 함수의 두 번째 파라미터를 비어있는 배열로 넣어주면 된다.
    ```js
    useEffect(()=> {
      console.log('마운트 될 때만');
    },[]);
    ```
  + 특정 값이 변경될 때만 호출하고 싶으면 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값 넣어준다.
    ```js
    useEffect(()=> {
      console.log('업데이트 될 때만');
    },[name]);
    ```
+ 첫 번째 파라미터에 return 을 넣어주면 언마운트되기 전이나 업데이트 되기 직전에 수행하는 작업 수행가능 => 아래 결과 input 에 값을 입력하면 clean up/이전 값 -> effect/변경된 값 순서대로 출력한다.
  ```js
  useEffect(() => {
    console.log('effect');
    console.log(name);

    return () => {
      console.log('clean up');
      console.log(name);
    }
  }, [name]);
  ```
  + 이 때 두 번째 파라미터를 비어있는 배열 넣으면 언마운트 될 때만 함수 호출됨

## useReducer

현재 상태, 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수.
리듀서 함수에서 새로운 상태를 만들 때는 불변성 지켜야 한다.
```js
function reducer(state, action) {
  return {...}; //불변성 지키면서 업데이트한 새로운 상태 반환
}
```

```js
//액션 예시
//리덕스에서 사용하는 액션 객체에는 type 필드 필요
//useReducer 에서 사용하는 액션 객체는 type 없어도됨, 객체 말고 문자열, 숫자도 가능
{
  type: 'INCREMENT',
}
```

+ useReducer 의
  + 첫 번째 파라미터 : 리듀서 함수
  + 두 번째 파라미터 : 해당 리듀서의 기본 값
+ 결과로 state 와 dispatch 함수를 받아온다
  + state : 현재 가리키고 있는 상태
  + dispatch : 액션을 발생시키는 함수 (함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조)
    + useReducer의 액션은 어떤 값도 사용 가능
+ 장점 : **컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다!!**

## useMemo
함수형 컴포넌트 내부에서 발생하는 연산 최적화

+ 렌더링 하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전 결과를 다시 사용하는 방식.
```js
//list 배열의 내용이 바뀔 때만 getAverage 함수가 호출
const avg = useMemo(() => getAverage(list), [list]);
```

## useCallback
렌더링 성능 최적화 하는 상황에서 사용, 만들어 놨던 함수를 재사용할 수 있음
+ 그냥 함수 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 된다. 
+ 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해줘야 한다.

+ useCallback의
  + 첫 번째 파라미터 : 생성하고 싶은 함수
  + 두 번째 파라미터 : 배열, 어떤 값이 바뀌었을 때 새로 생성해야하는지 그 값을 배열로 넣는다.
    + 빈 값 : 처음에 렌더링될 때만 함수 생성
    + 함수에서 상태 값에 의존해야할 때는 그 값을 반드시 두 번재 파라미터 안에 포함시켜야 한다.

## useRef
함수형 컴포넌트에서 ref을 쉽게 사용할 수 있도록 해 준다.

## 커스텀 Hook
여러 컴포넌트에서 비슷한 기능 공유할 때

## 기타 알게된 것
### e.target
+ `e.target` 찍으면 `<input name="name" value="dddd">` 출력됨
```js
  const onChange = e => {
    console.log(e.target);
  };
  return
    ...
    <input name="name" value={name} onChange={onChange}/>
    ...
```

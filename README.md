# FE 코딩 테스트 v1

## Vanila JS (기초)

### 1. `구조 분해 할당`에 대해 서술하시오.

배열 혹은 객체에서 각 값이나 프로퍼티를 분해하여 별도의 변수에 담을 수 있도록 하는 JavaScript의 표현식입니다.
예를 들어 [10, 20, 30] 배열의 각 값을 별도의 변수에 담고 싶다면 다음과 같이 코드를 작성하면 됩니다.

```js
let mylist = [10, 20, 30];

let [a, b, c] = mylisyt;
```

이를 활용해 보통 Object.entries를 이용해 객체를 [key, value] 형태로 받을 때 많이 사용합니다.

```js
let myobject = {
  one: 1,
  two: 2,
  three: 3,
};

for (let [key, value] of Object.entries(myobject)) {
  console.log(`키 : ${key}, 값 : ${value}`);
}
```

그리고 ...(spread 연산자)를 활용하여 원하는 값만 변수에 할당하고, 나머지 값은 한 변수에 담는 방법도 있습니다.

```js
let [one, two, ...rest] = [1, 2, 3, 4, 5, 6, 7];

console.log(one, two); // 1 2
console.log(rest[0]); // 3
console.log(rest[2]); // 5
console.log(rest.length); // 5
```

<br/>

### 2. `Optional Channing`에 대해 서술하고 하위 호환을 위해 어떻게 표기해야 하는지 서술하시오.

`Optional Channing`은 특정 객체에서 어떤 값을 가져오는 과정에서 그 값이 undefined나 null인지를 판단해 맞다면 undefined를 뱉어내고 아니라면 그 값에 접근할 수 있도록 합니다.

그래서 안전하게 값을 불러오기 위해선 아래와 같이 코드를 작성하면 됩니다.

```js
let emptyObject = {};

console.log(emptyObject?.depth1.depth2);
```

이렇게 하면 에러 없이 undefined가 표시됩니다.

여기서 주의할 점은 emptyObject가 비어있지 않고 실제 값이 존재한다면 depth1 프로퍼티는 존재해야 합니다. 그렇지 않다면 depth2 앞의 .에서 에러가 발생합니다. 이런 경우 필수값인 emptyObject에 `Optional Channing`을 붙이는 것이 아니라 아래 코드와 닽이 depth1 다음에 Optional Channing을 붙입니다.

```js
console.log(emptyObject.depth1?.depth2);
```

`Optional Channing`은 최신 문법이기 때문에 옛 환경에서는 지원되지 않습니다. 그렇기에 옛 환경 즉 하위 호환을 위해선 삼항연산자를 이용해 미리 null을 체크하여 체크한 결과에 맞는 값을 내보내면 됩니다. undefined의 경우 에러 없이 표시되기 때문에 에러로 처리되는 null에 대해서 체크하고 undefinded 혹은 실제 값을 보내주면 됩니다.

```js
const compaatbility =
  emptyObject !== null && emptyObject.depth1 !== null
    ? emptyObject.depth1.depth2
    : undefined;
```

<br/>

### 3. 빈 배열에 아래 일려읜 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.

1.  `push('a')`
2.  `shift()`
3.  `unshift('e')`

'a'가 들어갔다가 shift()로 배열 첫번쨰 요소인 'a'가 사라지고 다시 unshift('e') 과정에서 배열에 첫번쨰에 'e'가 추가됩니다. 배열에는 'e' 하나가 담겨있습니다.

### 4. `Promise`에 대해 서술하고, `Promise`를 사용할 때 주의할 점을 2가지 이상 서술하시오.

**`Promise`란 무엇인가**
`Promise` 객체는 비동기 작업이 제대로 완료 되었는지 혹은 실패했는지를 나타내는 객체입니다. 비동기 작업이 끝날 때까지 기다리는 것이 아니라 결과를 제공하겠다는 약속을 받아낸다는 의미에서 `Promise`라는 명칭이 붙었습니다.

이러한 `Promise` 객체를 사용할 때에는 내부에 콜백 함수를 넣고, 성공을 나타내는 첫번 째 인수와 실패를 나타내는 두 번째 인수를 이용해 비동기 작업의 성공과 실패에 따라 원하는 작업을 진행할 수 있습니다. 그리고 비동기 작업이 완료된 후, .then(), .catch, .finally() 등의 method 체이닝을 이용해 그 다음의 작업을 진행할 수 있습니다.

<사용 예시>

```js
function promiseFn() {
  return new Promise((resolve, reject) => {
    const data = fetch("url/example");

    if (data) {
      resolve(data);
    } else {
      reject("Error");
    }
  });
}

promiseFn()
  .then((data) => {
    console.log("데이터 페칭 성공", data);
  })
  .catch((error) => {
    console.log("데이터 페칭 실패", error);
  })
  .finally(() => {
    // 마지막에 무조건 실행됨
    console.log("데이터 페칭 끝");
  });
```

임의로 fetch()를 사용하긴 했지만 fetch()는 js에서 이미 내부적으로 `Promise` 객체를 반환하기 때문에 위와 같은 작업 없이 바로 fetch() 뒤에 .then(), .catch()와 같은 메서드 체이닝을 이용할 수 있다.

그리고 이러한 `Promise` 객체는 비동기 작업에 대해 세 가지 상태를 가집니다.

- pending(작업 진행 중), fullfilled(작업 성공적으로 완료), rejected(작업 실패)

**`Promise`를 사용하며 주의할 점**

1. `Promise` 객체에 사용되는 method 체이닝이 과도하게 중첩되지 않도록 주의해야 한다. methode 체이닝이 과도한게 중첩된다면 코드의 가독성이 떨어진다.
2. `Promise`객체에서 반환된 reject에 대해서 .catch나 try-catch문의 catch 블록에서 처리해야 합니다. 그렇지 않으면 rejection을 처리하지 않았다는 경고를 받습니다.

<br />
<br />

## React

1. 기초
   className prop을 항상 제외하는 `BaseTextArea` 컴포넌트를 구현하시오. -부모 컴포넌트(Editor)는<br />
   `textarea`를 `ref`로 참조해야 한다.

- 부모 컴포넌트는 버튼 2개와<br />
  `BaseTextArea`로 구성되어 있으며 React Hook을 사용하지 않는다.
- 버튼 1을 클릭하면<br />
  `BaseTextArea`에 입력한 값을 삭제해 주세요.
- 버튼 2를 클릭하면<br />
  `BaseTextArea`에 입력한 단어 중에 몇 개의 에너그램이 존재하는지 출력해 주세요.

<br />

2. 라이브러리 활용
   마크다운을 파싱하기 위한 대표적인 라이브러리 `marked`가 있다
   [https://www.npmjs.com/package/marked](https://www.npmjs.com/package/marked)
   1. marked가 제공하는 renderer 옵션을 사용해서 `H1`, `H2`, `H3` `Heading`에 `anchor`를 추가하시오.
   2. 인용문을 클릭하면 인용문을 복사하는 기능을 추가하시오.
   3. `textarea`에 작성한 마크다운 텍스트를 파싱해서 화면에 출력하시오.

<br />
<br />

## 심화 (알고리즘)

주어진 `그래프 1`에서 임의의 노드로부터 모든 간선을 한 번만 지나는 경로가 있는지 확인하고,
경로가 존재한다면 그 경로를 return하는 자바스크립트 함수를 작성하시오.
또한 경호가 존재하기 위한 조건이 무엇인지 설명하시오.

- ES6이상 문법으로 작성할 것.
- 함수의 입력은 각 노드의 이웃 노드들을 나열한 인접 리스트 형태의 2차원 배열입니다.
- 모든 노드는 'A'부터 시작하는 문자입니다.

![image](https://github.com/user-attachments/assets/33d83a60-ffa6-4565-aaa0-82cec60655a1)

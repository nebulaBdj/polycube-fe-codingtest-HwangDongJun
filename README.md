# FE 코딩 테스트 v1

## Vanila JS (기초)

1. `구조 분해 할당`에 대해 서술하시오.


2. `Optional Channing`에 대해 서술하고 하위 호환을 위해 어떻게 표기해야 하는지 서술하시오.


3. 빈 배열에 아래 일려읜 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.
    1. `push('a')`
    2. `shift()`
    3. `unshift('e')`


4. `Promise`에 대해 서술하고, `Promise`를 사용할 때 주의할 점을 2가지 이상 서술하시오.

<br />

## React
1. 기초
  className prop을 항상 제외하는 `BaseTextArea` 컴포넌트를 구현하시오.
  -부모 컴포넌트(Editor)는<br />
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

## 심화 (알고리즘)
주어진 `그래프 1`에서 임의의 노드로부터 모든 간선을 한 번만 지나는 경로가 있는지 확인하고,
경로가 존재한다면 그 경로를 return하는 자바스크립트 함수를 작성하시오.
또한 경호가 존재하기 위한 조건이 무엇인지 설명하시오.

- ES6이상 문법으로 작성할 것.
- 함수의 입력은 각 노드의 이웃 노드들을 나열한 인접 리스트 형태의 2차원 배열입니다.
- 모든 노드는 'A'부터 시작하는 문자입니다.

![image](https://github.com/user-attachments/assets/c6cb8097-8aab-48ed-9c61-b78c6e127f8a)

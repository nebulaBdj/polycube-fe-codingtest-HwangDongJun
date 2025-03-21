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

여기서 주의할 점은 emptyObject가 비어있지 않고 실제 값이 존재한다면 depth1 프로퍼티는 존재해야 합니다. 그렇지 않다면 depth2 앞의 .에서 에러가 발생합니다. 이런 경우 필수값인 emptyObject에 `Optional Channing`을 붙이는 것이 아니라 아래 코드와 같이 depth1 다음에 `Optional Channing`을 붙입니다.

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

### 3. 빈 배열에 아래 일련의 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.

1.  `push('a')`
2.  `shift()`
3.  `unshift('e')`

'a'가 들어갔다가 shift()로 배열 첫 번째 요소인 'a'가 사라지고 다시 unshift('e') 과정에서 배열에 첫 번째에 'e'가 추가됩니다. 배열에는 'e' 하나가 담겨있습니다.

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

임의로 fetch()를 사용하긴 했지만 fetch()는 js에서 이미 내부적으로 `Promise` 객체를 반환하기 때문에 위와 같은 작업 없이 바로 fetch() 뒤에 .then(), .catch()와 같은 method 체이닝을 이용할 수 있습니다.

그리고 이러한 `Promise` 객체는 비동기 작업에 대해 세 가지 상태를 가집니다.

- pending(작업 진행 중), fullfilled(작업 성공적으로 완료), rejected(작업 실패)

**`Promise`를 사용하며 주의할 점**

1. `Promise` 객체에 사용되는 method 체이닝이 과도하게 중첩되지 않도록 주의해야 합니다. method 체이닝이 과도하게 중첩된다면 코드의 가독성이 떨어지기 때문입니다.
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

### 구현 과정

**기술 스택 선정**

우선 기본적인 기능을 구현하는 과제이기에 제시해 준 marked 라이브러리를 제외 다른 라이브러리는 사용하지 않기로 결정했습니다. 기초적으로 사용한 기술 스택은 다음과 같습니다.

- Vite : 2022년 4월 이후 업데이트가 없고 React 공식 문서에서 제외된 CRA를 대체해 간편히 React Project를 구성할 수 있는 Vite를 사용했습니다.
- TypeScript : 컴파일 타임 단에서 타입 안정성을 확보하여 안정적인 코드를 작성하고자 TypeScript를 사용했습니다.
- pnpm : 빠른 개발을 진행하고자 전역 저장소와 하드 링크, 심볼릭 링크를 이용해 npm와 yarn의 Ghost Dependaency 문제를 해결하여 다른 패키지에 비해 설치 속도가 빠른 pnpm을 사용했습니다.

<br />

**`<BaseTextArea />` 컴포넌트 구현**

먼저 BaseTextArea에 대한 Props에 대해서 TextareaHTMLAttributes로 정의해주었고, Omit을 이용해 className을 제외했습니다.

```tsx
type BaseTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "calssName"
>;
```

이후 부모 컴포넌트가 자식 컴포넌트인 BaseTextArea의 textarea의 DOM 요소에 직접 접근할 수 있도록 forwardRef 타입을 지정하여 해당 컴포넌트의 타입과 Props의 타입을 함께 정의했습니다.

```tsx
import { forwardRef, TextareaHTMLAttributes } from "react";

type BaseTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "calssName"
>;

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <textarea ref={ref} {...rest} />;
  }
);
```

<br />

**`<Editor />` 컴포넌트 구현 (기초)**

React Hook을 사용하지 않아야 하기 때문에 클래스 컴포넌트로 Editor 컴포넌트를 구현했습니다.

- **State 타입 정의**

먼저 textarea 내부의 값에 대해 타입 선언을 해줍니다.

```ts
interface EditorState {
  mytext: string;
}
```

- **생성자 호출 및 textareaRef 생성**

Editor 컴포넌트는 상위 부모 컴포넌트이므로 외부에서 접근할 수 없도록 private를 이용해 선언해주고, Componet의 생성자를 호출하여 textarea애 대한 ref인 textareaRef에 textarea ref 값을 만들어 넣어줍니다. 앞서 정의한 mystate의 상태 초기화도 진행합니다.

```ts
constructor(props: {}) {
  super(props);
  this.textareaRef = createRef<HTMLTextAreaElement>();
  this.state = {
    mytext: "",
  };
}
```

- **handleDelete**

참조한 textareaRef가 제대로 있는지를 참고하고 기존 값을 지워줍니다.

```ts
handleDelete = () => {
  if (this.textareaRef.current) {
    this.textareaRef.current.value = "";
    this.setState({ mytext: "" });
  }
};
```

- **handleCountAngram**

동일하게 참조된 값을 확인하고, textarea에 입력된 문자열을 가져와 에너그램 검사를 진행합니다. trim으로 시작과 끝에 존재하는 줄바꿈 및 불필요한 공백을 제거하고 .split 내부에 공백 문자 정규식(/\s+/)를 넣어 각 단어들을 가진 배열을 만듭니다.

```ts
const words = text
  .trim()
  .split(/\s+/)
  .filter((word) => word.length > 0);
```

이후 각 단어를 소문자로 변환하여 정렬한 후에 동일한 단어인 경우 개수를 넣어줄 것인데, 키로 단어를 가지고 값으로 개수를 가지는 빈 객체를 만든 후에 단어 문자열을 순회합니다. 단어를 한글자씩 분해해 정렬한 후 다시 join을 통해 문자로 만들어 변수에 넣어줍니다. 그 변수에 할당된 단어를 키로 가진 객체 내부 프로퍼티가 있다면 +1을 해주고 없다면 새로 등록합니다.

```ts
words.forEach((word) => {
  const sorted = word.toLowerCase().split("").sort().join("");
  groups[sorted] = (groups[sorted] || 0) + 1;
});
```

위에서 만든 객체를 이용해 중복되는 단어의 개수를 모두 더하여 에너그램의 개수를 출력합니다.

```ts
let count = 0;
for (const key in groups) {
  if (groups[key] > 1) count += groups[key];
}

alert(`에너그램 ${count}개 존재`);
```

- **handleChange**

textareaRef로 참조하고 있는 텍스트를 가져와 state에 계속 업데이트 해줍니다.

```ts
handleChange = () => {
  if (this.textareaRef.current) {
    const text = this.textareaRef.current.value;
    this.setState({ mytext: text });
  }
};
```

이렇게 하여 기초 요구사항을 충족시켰습니다.

<br />

**`<Editor />` 컴포넌트 구현 (라이브러리 활용)**

- **marked.js 간단한 이해 및 설치**

marked 라이브러리는 마크다운 형식의 텍스트를 HTML로 빠르게 변환해주는 라이브러리입니다.
각 마크다운 요소(H1, H2, 인용문 등)를 HTML로 변환하는 함수를 제공하고 동작을 커스터마이징 할 수 있도록 renderer 옵션을 지원합니다.

```bash
pnpm i marked --save-dev
```

- **요구사항을 충족하는 커스텀 renderer 구현**

우선 new를 이용해 새로운 Renderer를 만들어주고, 요구사항인

1. marked가 제공하는 renderer 옵션을 사용해서 `H1`, `H2`, `H3` `Heading`에 `anchor`를 추가하시오.
2. 인용문을 클릭하면 인용문을 복사하는 기능을 추가하시오.
3. `textarea`에 작성한 마크다운 텍스트를 파싱해서 화면에 출력하시오.

를 만족할 수 있도록 설정합니다.

해당 과정에서 renderer의 내부 속성의 타입을 정의해주기 위해 각 속성을 가지고 있는 Tokens를 marked 라이브러리에서 추가적으로 import 해줬고, 각 요구사항을 다음과 같이 충족했습니다.

- 새로운 renderer 생성 후, heading에 depth가 1, 2, 3인 경우 anchor 추가

```ts
const renderer = new marked.Renderer();

renderer.heading = function ({ tokens, depth }: Tokens.Heading): string {
  const text = this.parser.parseInline(tokens);

  if (depth >= 1 && depth <= 3) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

    return `
       <h${depth}>
          <a name="${escapedText}" class="anchor" href="#${escapedText}">
            <span class="header-link"></span>
          </a>
          ${text}
        </h${depth}>
    `;
  }

  return `<h${depth}>${text}</h${depth}>`;
};
```

- 인용문을 클릭할 경우 전역으로 copyQuote함수를 만들고, 반환할 때 onclick에 추가

반환할 때 onclick에 인용문 복사 함수(copyQuote) 추가

```ts
renderer.blockquote = function ({ tokens }: Tokens.Blockquote): string {
  const content = this.parser.parse(tokens);
  return `<blockquote onclick="copyQuote(event)">${content}</blockquote>`;
};
```

blockquote의 자식 토큰은 보통 block-level 토큰들이기 때문에 위에서 사용한 inline 파서는 해당 토큰을 제대로 처리할 수 없습니다. 그래서 parse를 이용합니다.

컴포넌트가 마운트될 때 copyQuote 함수를 구현하고 customRenderer를 적용

```ts
componentDidMount(): void {
  (window as any).copyQuote = (event: MouseEvent): void => {
    const target = event.currentTarget as HTMLElement;
    const areaText = target.innerText;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(areaText)
        .then(() => alert("인용문이 복사됐습니다."));
    } else {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = areaText;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      try {
        document.execCommand("copy");
        alert("인용문이 복사되었습니다.");
      } catch (error) {
        alert("복사에 실패했습니다.");
      }
      document.body.removeChild(tempTextArea);
    }
  };

  this.customRenderer();
}
```

- textarea에 입력된 text를 marked로 변환하여 화면에 표시

```html
<div
  dangerouslySetInnerHTML="{{"
  __html:
  marked.parse(this.state.markdown),
  }}
/>
```

### 최종 코드

```tsx
import { Component, createRef, ReactNode, RefObject } from "react";
import { BaseTextArea } from "./BaseTextArea";
import { marked, Tokens } from "marked";

interface EditorState {
  markdown: string;
}

class Editor extends Component<{}, EditorState> {
  private textareaRef: RefObject<HTMLTextAreaElement | null>;

  constructor(props: {}) {
    super(props);
    this.textareaRef = createRef<HTMLTextAreaElement>();
    this.state = {
      markdown: "",
    };
  }

  componentDidMount(): void {
    (window as any).copyQuote = (event: MouseEvent): void => {
      const target = event.currentTarget as HTMLElement;
      const areaText = target.innerText;
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(areaText)
          .then(() => alert("인용문이 복사됐습니다."));
      } else {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = areaText;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
          document.execCommand("copy");
          alert("인용문이 복사되었습니다.");
        } catch (error) {
          alert("복사에 실패했습니다.");
        }
        document.body.removeChild(tempTextArea);
      }
    };

    this.customRenderer();
  }

  // renderer 요구 사항에 맞춰 customRenderer 구현
  customRenderer() {
    const renderer = new marked.Renderer();

    renderer.heading = function ({ tokens, depth }: Tokens.Heading): string {
      const text = this.parser.parseInline(tokens);

      if (depth >= 1 && depth <= 3) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

        return `
           <h${depth}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${depth}> 
        `;
      }

      return `<h${depth}>${text}</h${depth}>`;
    };

    renderer.blockquote = function ({ tokens }: Tokens.Blockquote): string {
      const content = this.parser.parse(tokens);
      return `<blockquote onclick="copyQuote(event)">${content}</blockquote>`;
    };

    marked.use({ renderer });
  }

  handleDelete = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.value = "";
      this.setState({ markdown: "" });
    }
  };

  handleCountAngram = () => {
    if (this.textareaRef.current) {
      const text = this.textareaRef.current.value;

      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const groups: { [key: string]: number } = {};

      words.forEach((word) => {
        const sorted = word.toLowerCase().split("").sort().join("");
        groups[sorted] = (groups[sorted] || 0) + 1;
      });

      let count = 0;
      for (const key in groups) {
        if (groups[key] > 1) count += groups[key];
      }

      alert(`에너그램 ${count}개 존재`);
    }
  };

  handleChange = () => {
    if (this.textareaRef.current) {
      const text = this.textareaRef.current.value;
      this.setState({ markdown: text });
    }
  };

  render(): ReactNode {
    return (
      <div>
        <div>
          <BaseTextArea
            ref={this.textareaRef}
            onChange={this.handleChange}
            placeholder="텍스트를 입력하세요"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(this.state.markdown),
            }}
          />
        </div>

        <div>
          <button onClick={this.handleDelete}>텍스트 삭제</button>
          <button onClick={this.handleCountAngram}>에너그램 검사</button>
        </div>
      </div>
    );
  }
}

export default Editor;
```

### CSS 스타일 적용

```tsx
  render(): ReactNode {
    return (
      <div>
        <h1>Markdown Editor</h1>
        <main>
          <div className="editor-textarea-container">
            <BaseTextArea
              ref={this.textareaRef}
              onChange={this.handleChange}
              placeholder="텍스트를 입력하세요"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(this.state.markdown),
              }}
            />
          </div>

          <div className="editor-buttons">
            <button className="editor-button" onClick={this.handleDelete}>
              텍스트 삭제
            </button>
            <button className="editor-button" onClick={this.handleCountAngram}>
              에너그램 검사
            </button>
          </div>
        </main>
      </div>
    );
  }
```

```css
.editor-textarea-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.editor-textarea-container textarea {
  width: 45%;
  height: 35rem;
  padding: 1rem;
  resize: none;
  border-radius: 1rem;
}

.editor-textarea-container div {
  width: 45%;
  height: 35rem;
  padding: 1rem;
  border: 1px solid darkgrey;
  border-radius: 1rem;
}

.editor-textarea-container blockquote {
  cursor: pointer;
}

.editor-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.editor-button {
  width: 20rem;
  height: 2.5rem;
  background-color: cornflowerblue;
  font-size: medium;
  font-weight: 600;
  color: aliceblue;
  border: none;
  border-radius: 0.5rem;
}
```

인용문을 클릭할 수 있다는 것을 알아야 하기에 마크다운을 변환해 표시해주는 div의 하위 blockquote에 cursor: pointer;를 추가했습니다.

<br />
<br />

## 심화 (알고리즘)

주어진 `그래프 1`에서 임의의 노드로부터 모든 간선을 한 번만 지나는 경로가 있는지 확인하고,
경로가 존재한다면 그 경로를 return하는 자바스크립트 함수를 작성하시오.
또한 경로가 존재하기 위한 조건이 무엇인지 설명하시오.

- ES6이상 문법으로 작성할 것.
- 함수의 입력은 각 노드의 이웃 노드들을 나열한 인접 리스트 형태의 2차원 배열입니다.
- 모든 노드는 'A'부터 시작하는 문자입니다.

![image](https://github.com/user-attachments/assets/33d83a60-ffa6-4565-aaa0-82cec60655a1)

### 풀이

해당 문제는 오일러 경로를 찾는 문제라고 이해했습니다. 이러한 오일러 경로는 찾는 과정에서 차수, 즉 한 노드에 연결된 간선의 개수를 기준으로 하여 두 가지 상황으로 나눌 수 있는데요. 첫 번째는 모든 노드의 차수가 짝수인 경우이고, 두 번째는 차수가 홀수인 노드가 존재하는 경우입니다.

모든 노드의 차수가 짝수인 경우는 오일러 서킷이라고 부르는 모든 시작점과 끝점이 같은 오일러 경로가 있는 조건입니다. 따라서 모든 노드의 차수가 짝수라면 무조건 오일러 경로가 존재하는 것입니다. 만약 차수가 홀수인 노드가 존재한다면 차수가 홀수인 노드가 2개여야 각 노드가 시작점과 끝점이 되고 오일러 경로가 존재합니다.

이렇게 상황을 구분한 이유는 DFS로 경로를 탐색하는 코드를 작성할 예정인데, 그 시작점을 어디로 정해야할지 판단하기 위해 구분했습니다.

- 홀수 차수 노드가 2개라면, 둘 중 하나를 시작 노드로 선택합니다.
- 모든 노드가 짝수라면, 간선이 있는 어떠한 노드를 시작점으로 잡아도 오일러 경로를 찾을 수 있습니다.

그러므로,

1. 노드의 차수를 분석해 오일러 경로가 존재하는지 판단 후 시작 노드 선택

   - 홀수 차수 노드가 2개라면 그 중 하나를 시작 노드로 선택
   - 모든 노드의 차수가 짝수라면 간선이 있는 노드를 임의로 선택

2. 간선을 DFS로 탐색하며, 경로 생성

   - 더 이상 이동랑 간선이 없는 노드에 도달한다면 그 경로를 기록

3. 아직 지나치지 않은 간선이 있다면, 만들어진 경로에서 간선을 더 사용할 수 있는 노드에서 다시 출발하여 경로를 확장하고, 이를 합칩니다.
4. 모든 간선을 다 지나고 최종적으로 이어붙인 경로가 오일러 경로입니다.

문제를 어떻게 풀지에 대해 설명했고, 코드를 작성하면서 주석을 통해 부가적으로 설명 드리겠습니다.

<br />
받은 입력을 인접 리스트로 만드는 함수를 먼저 구현합니다.

```js
// 받은 입력으로 인접 리스트를 만듭니다.
function buildList(edges) {
  // 모든 노드를 set 자료형에 모읍니다.
  const nodeSet = new Set();
  edges.forEach(([u, v]) => {
    nodeSet.add(u);
    nodeSet.add(v);
  });
  const nodes = Array.from(nodeSet);

  // 인접 리스트를 만들기 위해 문자를 키로 인덱스를 값으로 가진 객체를 만들어줍니다.
  const nodeIndexObj = {};
  nodes.forEach((ch, i) => {
    nodeIndexObj[ch] = i;
  });

  // 인접 리스트를 초기화하여 틀을 생성해주고,
  const n = nodes.length;
  const list = Array.from({ length: n }, () => []);

  // 서로 연결되어 있는 노드들을 입력해줍니다.
  edges.forEach(([u, v]) => {
    const ui = nodeIndexObj[u];
    const vi = nodeIndexObj[v];
    list[ui].push(vi);
    list[vi].push(ui);
  });

  return { list, nodes };
}
```

<br />
이후 각 노드의 차수를 계산해 오일러 경로 생성의 유무를 판단하고, 경로에 대한 인덱스를 가진 answer를 반환하는 함수를 작성합니다.

```js
function findPathIndex(list) {
  const n = list.length;
  const degree = list.map((adj) => adj.length); // 각 노드의 차수를 계산합니다.

  // 홀수 차수 노드의 개수를 계산합니다.
  let oddCount = 0;
  let startNode = 0;
  for (let i = 0; i < n; i++) {
    if (degree[i] % 2 !== 0) {
      oddCount++;
      startNode = i; // 홀수 차수 노드를 시작점 후보로 선택합니다.
    }
  }

  // 오일러 경로가 존재할 수 없는 경우 빈 배열을 반환합니다
  if (!(oddCount === 0 || oddCount === 2)) {
    return null;
  }

  // 홀수 차수가 없는 경우 즉 모든 노드의 차수가 짝수인 경우 임의로 시작점을 지정합니다.
  if (oddCount === 0) {
    for (let i = 0; i < n; i++) {
      if (degree[i] > 0) {
        startNode = i;
        break;
      }
    }
  }

  // 리스트를 복사하고 스택을 만들어 시작점을 넣어줍니다.
  const listCopy = list.map((row) => [...row]);
  const stack = [];
  const answer = [];
  let current = startNode;
  stack.push(current);

  while (stack.length > 0) {
    if (listCopy[current].length === 0) {
      // 더이상 방문할 노드가 없다면 현재 노드를 answer에 넣어줍니다.
      answer.push(current);
      current = stack.pop();
    } else {
      stack.push(current); // 현재 노드를 스택에 저장한 후,
      const next = listCopy[current].pop(); // 현재 노드와 인접한 노드를 꺼냅니다.

      // 방향이 없는 그래프이기 때문에 연결된 반대쪽에서 현재 노드에 연결되어 있다면, 제거합니다.
      const idx = listCopy[next].indexOf(current);
      if (idx !== -1) {
        listCopy[next].splice(idx, 1);
      }
      current = next;
    }
  }
  return answer;
}
```

<br />
예시 입출력을 받을 수 있는 입출력 코드를 작성합니다.

```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("입력 : ", (answer) => {
  try {
    // 작은따옴표로 입력된 경우 큰따옴표로 바꿔서 JSON 파싱이 가능하도록 해줍니다.
    const replaced = answer.replace(/'/g, '"').trim();
    const edges = JSON.parse(replaced);

    // 배열 형식이 아닌 경우 알고리즘이 받을 수 없기 때문에 에러처리를 합니다.
    if (!Array.isArray(edges)) {
      throw new Error("배열 형식이 아님");
    }

    const { list, nodes } = buildList(edges);
    const pathIndex = findPathIndex(list);

    if (pathIndex) {
      const path = pathIndex.map((i) => nodes[i]);
      console.log(path);
    } else {
      console.log("경로가 존재하지 않습니다.");
    }
  } catch (e) {
    console.error("잘못된 입력입니다 :", e.message);
  }
  rl.close();
});
```

public 폴더에 실습 파일 codingtest-deepen.cjs에서 실제 코드를 작성했습니다.
node codingtest-deepen.cjs 명령어를 통해 실습을 진행했고, 예시 입출력이 나오는 것을 확인했습니다.

이렇게 코딩 테스트 기회를 주셔서 정말 감사합니다.

const readline = require("readline");

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

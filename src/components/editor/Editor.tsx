import { Component, createRef, ReactNode, RefObject } from "react";
import { marked, Tokens } from "marked";
import { BaseTextArea } from "./BaseTextArea";
import "./editor.css";

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
}

export default Editor;

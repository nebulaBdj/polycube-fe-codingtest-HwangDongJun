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

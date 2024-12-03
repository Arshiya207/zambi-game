import React from "react";
export default function Prompt(props) {
  const conditionClass = {
    dismissAnim: props.prompt.dismissAnim ? "prompt-dismiss" : "",
    enteranceAnim: props.prompt.enteranceAnim ? " prompt-enterance" : "",
  };

  return (
    <div
      className={`prompt ${conditionClass.dismissAnim} ${conditionClass.enteranceAnim}`}
    >
      <div className="prompt__title">{props.prompt.title}</div>
      <div className="prompt__message">{props.prompt.message}</div>
      <button className="btn" onClick={props.dismissPrompt}>
        OK!
      </button>
    </div>
  );
}

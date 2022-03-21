import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import CodeEditor from "@uiw/react-textarea-code-editor";
import "../App.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

const Compiler = () => {
  let navigate = useNavigate();
  //   const [code, setCode] = useState("");
  const [code, setCode] = useState(`#include <stdio.h>
int main() {
     printf("Hello, World!");
     return 0;
}`);

  const submitCode = async () => {
    console.log(code);
    const res = await fetch("/submitcode", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    const data1 = await res.json();
    if (!data1) {
      console.log("code not sent");
    } else {
      alert("sent");
    }
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/compiler", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container">
        Compiler
        <button onClick={submitCode}>submit</button>
        <br />
        <br />
        <div>
          <AceEditor
            style={{
              height: "70vh",
              width: "70%",
              borderRadius: "10px",
            }}
            placeholder="Start Coding"
            mode="javascript"
            theme="monokai"
            name="basic-code-editor"
            onChange={(e) => setCode(e)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Compiler;

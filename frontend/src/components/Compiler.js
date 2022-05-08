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

  const [input, setInput] = useState("");
  const [inputtype, setInputtype] = useState("yes");
  const [output, setOutput] = useState("");

  const submitCode = async () => {
    console.log(code);
    console.log(input);
    console.log(inputtype);
    const res = await fetch("/submitcode", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code,
        input,
        inputtype,
      }),
    });
    const data1 = await res.json();
    if (!data1) {
      console.log("code not sent");
    } else {
      // console.log(data1);
      setOutput(data1);
      console.log("sent successfully");
      // alert("sent");
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
        <div className="row">
          <div className="col mx-3 my-3">
            {/* Compiler */}
            <button
              onClick={submitCode}
              style={{ float: "right" }}
              className="btn btn-success"
            >
              RUN
            </button>
            <div>
              Compile With Input :
              <select
                name=""
                id=""
                className="form-select"
                style={{ width: "90px" }}
              >
                <option
                  value="no"
                  onChange={(e) => setInputtype(e.target.value)}
                >
                  no
                </option>
                <option
                  value="yes"
                  onChange={(e) => setInputtype(e.target.value)}
                >
                  yes
                </option>
              </select>
            </div>
            <div className="my-3">
              <AceEditor
                style={{
                  height: "55vh",
                  width: "100%",
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
            <p>Input:</p>
            <div className="my-3">
              <AceEditor
                style={{
                  height: "8vh",
                  width: "100%",
                  borderRadius: "10px",
                }}
                placeholder="INPUT ..."
                mode="javascript"
                theme="monokai"
                name="basic-code-editor"
                onChange={(e) => setInput(e)}
                fontSize={14}
                showPrintMargin={false}
                showGutter={false}
                highlightActiveLine={true}
                value={input}
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
          <div className="col col-lg-3 mx-3 my-3">
            <p class="card-text">
              output panel: <br />
              <AceEditor
                style={{
                  height: "60vh",
                  width: "300px",
                  borderRadius: "10px",
                }}
                // placeholder="Start Coding"
                mode="javascript"
                theme="monokai"
                name="basic-code-editor"
                // onChange={(e) => setCode(e)}
                fontSize={14}
                showPrintMargin={true}
                // showGutter={true}
                highlightActiveLine={true}
                value={output.output}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 4,
                }}
              />
              <br />
              {/* <br /> {output.output} */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;

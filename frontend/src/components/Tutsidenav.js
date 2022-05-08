import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Col, Tab, Row } from "react-bootstrap";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

const Tutsidenav = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");

  const [tutorial, setTutorial] = useState({ tutorials: [] });

  const divStyle = {
    color: "blue !important",
  };

  function Sidebar(props) {
    const sidebar = (
      <ul>
        {props.posts.map((data) => (
          <>
            {/* {data.title} */}
            <br />
            <Link
              className="nav-link"
              aria-current="page"
              to="#"
              onClick={setId(data._id)}
            >
              {data.title}
            </Link>
          </>
        ))}
      </ul>
    );

    // {
    //   if (data._id === id) {
    //     <div key={data.id}>
    //       <h3>{data.title}</h3>
    //       <p>{data.concept}</p>
    //       <p>{data.codesnippet}</p>
    //       <p>{data.practicequestion}</p>
    //     </div>;
    //   }
    // }

    const content = props.posts.map((data) => (
      <div key={data.id}>
        <h3>{data.title}</h3>
        <p>{data.concept}</p>
        <p>{data.codesnippet}</p>
        <p>{data.practicequestion}</p>
      </div>
    ));

    return (
      <div>
        {sidebar}

        {/* {content} */}
      </div>
    );
  }

  // useEffect(() => {
  //     // callTutorialPage();
  // }, [callTutorialPage]);

  useEffect(() => {
    fetch("/tutorial", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    console.log(items);
  }, []);

  // useEffect(() => {
  //   const fetchPostList = async () => {
  //     const data = await fetch("/tutorial", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "content-type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     setTutorial({ tutorials: data });
  //     console.log(data);
  //   };
  //   fetchPostList();
  // }, [setTutorial]);

  return (
    <>
      {/* <div>Tutsidenav 1234</div> */}
      {/* <Sidebar posts={items} /> */}

      <Tab.Container id="left-tabs-example" defaultActiveKey="C Loops">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              {items.map((items, index) => (
                <Nav.Item>
                  <Nav.Link eventKey={items.title}>{items.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {items.map((items, index) => (
                <Tab.Pane eventKey={items.title}>
                  <h3> {items.title}</h3>
                  <br />
                  <p>Concept: {items.concept}</p>
                  <br />
                  {/* <div> Code Snippet: {items.codesnippet}</div> */}
                  <AceEditor
                    style={{
                      height: "40vh",
                      width: "1000px",
                      borderRadius: "10px",
                    }}
                    placeholder="Start Coding"
                    mode="javascript"
                    theme="monokai"
                    name="basic-code-editor"
                    // onChange={(e) => setCode(e)}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={items.codesnippet}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 4,
                    }}
                  />
                  <br />
                  <p> Miscellaneous: {items.practicequestion}</p>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* <div className="container">
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.concept}</td>
            <td>{item.codesnippet}</td>
            <td>{item.practicequestion}</td>
          </tr>
        ))}
      </div> */}
    </>
  );
};

export default Tutsidenav;

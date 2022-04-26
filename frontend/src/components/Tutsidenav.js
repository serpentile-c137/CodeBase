import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Col, Tab, Row } from "react-bootstrap";

const Tutsidenav = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");

  const [tutorial, setTutorial] = useState({ tutorials: [] });

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

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
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
                  <h3>{items.title}</h3>
                  <p>{items.concept}</p>
                  <p>{items.codesnippet}</p>
                  <p>{items.practicequestion}</p>
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

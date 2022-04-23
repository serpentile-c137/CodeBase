import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <div>Tutsidenav 1234</div>
      <Sidebar posts={items} />
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

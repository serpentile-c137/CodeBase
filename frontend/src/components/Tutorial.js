import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Tutorial = () => {
  let navigate = useNavigate();
  const [data, setData] = useState("");
  // let { id } = useParams();
  //   console.log(id);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/tutorial", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const tutdata = await res.json();
      console.log(tutdata);
      setData(tutdata);
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  // function Sidebar(props) {
  //   const sidebar = (
  //     <ul>
  //       {props.posts.map((data) => (
  //         <>
  //           {data.title}
  //           <br />
  //           {/* <Link className="nav-link" aria-current="page" to="/">
  //             {data.title}
  //           </Link> */}
  //         </>
  //       ))}
  //     </ul>
  //   );
  //   const content = props.posts.map((data) => (
  //     <div key={data.id}>
  //       <h3>{data.title}</h3>
  //       <p>{data.concept}</p>
  //       <p>{data.codesnippet}</p>
  //       <p>{data.practicequestion}</p>
  //     </div>
  //   ));
  //   return (
  //     <div>
  //       {sidebar}
  //       {/* <hr />
  //       {content} */}
  //     </div>
  //   );
  // }

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div>Tutorial</div>
      {/* <Sidebar posts={data} /> */}
    </>
  );
};

export default Tutorial;

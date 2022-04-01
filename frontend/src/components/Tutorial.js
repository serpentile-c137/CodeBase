import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Tutorial = () => {
  let navigate = useNavigate();
  const [data, setData] = useState();
  let { id } = useParams();
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
      <div>Tutorial</div>

      {/* <div className="container">
        {data.map((user) => {
          if (user.id === id) {
            return (
              <>
                <br />
                {user._id}
                <strong>Title : </strong>
                {user.title}
                <br />
                <strong>concept : </strong>
                {user.concept}
                <br />
                <strong>codesnippet : </strong>
                {user.codesnippet}
                <br />
                <strong>practicequestion : </strong>
                {user.practicequestion}
                <br />
              </>
            );
          }
        })}
      </div> */}
    </>
  );
};

export default Tutorial;

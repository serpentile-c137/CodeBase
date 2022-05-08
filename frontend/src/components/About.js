import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();
  const [userdata, setUserdata] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserdata(data);
      console.log(userdata);

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
        <div class="card text-center mx-5 my-5">
          <div class="card-header">
            <h5 class="">About</h5>
          </div>
          <div class="card-body">
            {/* <h5 class="card-title">Username: {userdata.username}</h5> */}
            <p class="card-text">Username: {userdata.username}</p>
            <p class="card-text">Name: {userdata.name}</p>
            <p class="card-text">Email: {userdata.email}</p>
            <p class="card-text">Contact no: {userdata.contact}</p>
          </div>
          {/* <div class="card-footer text-muted">2 days ago</div> */}
        </div>
      </div>
    </>
  );
};

export default About;
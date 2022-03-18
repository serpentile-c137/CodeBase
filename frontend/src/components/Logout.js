import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            credentials: "include",

        }).then((res) => {
            navigate("/login");
            if (res.status != 200) {
                const error = new Error(res.error)
                throw error
            }
        }).catch((err) => {
            console.log(err)
        })
    })

    return (
        <div>Logout</div>
    )
}

export default Logout
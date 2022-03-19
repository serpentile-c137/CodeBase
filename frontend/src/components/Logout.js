import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App'

const Logout = () => {
    let navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext)

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
            dispatch({ type: "USER", payload: false })
            if (res.status !== 200) {
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
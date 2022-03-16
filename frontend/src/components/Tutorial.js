import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const Tutorial = () => {
    let navigate = useNavigate();

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "content-type": "application/json",
                },
                credentials: "include",
            })

            const data = await res.json()

            if (res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
            navigate("/login");
        }
    }

    useEffect(() => {
        callAboutPage()
    }, [])

    return (
        <div>Tutorial</div>
    )
}

export default Tutorial
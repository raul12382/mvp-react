import React from 'react'

const Mobile = () => {
    return (
        <div>
            {
        (os === "Mac OS" ?  <Redirect to="/migration" ></Redirect> :  "es mobile")
            }
        </div>
    )
}

export default Mobile

import React from 'react'

function Course({ course }) {
    const { id, title, description, image } = course
    console.log(course)

    return (
        <div className='course'>
            <div >
                <img src={image} alt={title} style={{ width: "150px", height: "auto" }} />
                <h4 className='title-courses'>{title}</h4>
                <h5 className='description'>{description}</h5>
            </div>
        </div>
    )
}

export default Course
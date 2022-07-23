import { useState } from "react"

const Blog = ({blog, addLike}) => {
  const [ detailsDisplayed, setDetailsDisplayed ] = useState(false)
  
  let buttonLabel = detailsDisplayed ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setDetailsDisplayed(!detailsDisplayed)

  return ( 
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      { detailsDisplayed ?
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          {blog.user ? 
            <div>{blog.user.name}</div> : 
            <div></div>}
        </div>
         : <div></div>
      }
    </div>  
  )
}

export default Blog
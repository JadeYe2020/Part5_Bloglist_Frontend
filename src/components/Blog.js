import Togglable from "./Togglable"

const Blog = ({blog, addLike}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return ( 
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable
       buttonLabelToShow='view'
       buttonLabelToHide='hide'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        {blog.user ? 
          <div>{blog.user.name}</div> : 
          <div></div>}
      </Togglable>
    </div>  
  )
}

export default Blog
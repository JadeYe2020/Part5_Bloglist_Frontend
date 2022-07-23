import Togglable from "./Togglable"
// import BlogDetais from "./BlogDetais"

const Blog = ({blog}) => {
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
          <button>like</button>
        </div>
        {blog.user ? 
          <div>{blog.user.name}</div> : 
          <div></div>}
      </Togglable>
    </div>  
  )
}

export default Blog
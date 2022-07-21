const CreateNew = props => (
  <form onSubmit={props.handleCreate}>
    <div>
      title:
      <input type='text' value={props.title} onChange={props.onTitleChange} />
    </div>
    <div>
      author:
      <input type='text' value={props.author} onChange={props.onAuthorChange} />
    </div>
    <div>
      url:
      <input type='text' value={props.url} onChange={props.onUrlChange} />
    </div>
    <button type="submit">create</button>
  </form>
)

export default CreateNew
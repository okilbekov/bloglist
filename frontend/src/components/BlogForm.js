import blogService from '../services/blogs'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }
  return (
    <div className='d-flex justify-content-center'>
      <Button variant="primary" onClick={handleShow} className="btn-add shadow-none">
        + Create blog
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new blog</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Url">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default BlogForm
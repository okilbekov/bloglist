import { Modal, Button, Form,  } from "react-bootstrap"
import { useState } from "react"

const Header = (props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.href = '/'
  }

  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <h1 className="col-8 col-sm-4">blogs</h1>

          <div className="col-4 col-sm-2 offset-sm-6">
            {props.user === null?
              <Button variant="primary" onClick={handleShow} className="shadow-none float-end">
                Login
              </Button>
            : <Button variant="primary" onClick={handleLogout} className="shadow-none float-end">
                Log out
              </Button>
            }
          </div>
        </div>

        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleLogin}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  value={props.username} 
                  onChange={({ target }) => props.setUsername(target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={props.password}
                  onChange={({ target }) => props.setPassword(target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </header>
  )
}

export default Header
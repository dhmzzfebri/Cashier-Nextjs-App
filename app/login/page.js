'use client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
  return (
    <>
      <div className="h-100 container-fluid">
        <div className="justify-content-center align-items-center h-100 row">
          <div className="loginContainer col-lg-12">
            <div className="p-4 d-flex justify-content-center gap-2">
              <div className="card">
                <div className="p-4 m-1 card-body">
                  <h5 className="mb-3 d-flex justify-content-center">Login</h5>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text"  placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Select className="mb-3" aria-label="Default select example" >
                      <option>Pilih</option>
                      <option value="admin">Admin</option>
                      <option value="petugas">Petugas</option>
                    </Form.Select>
                    <small class="pb-4 d-block">
                      Do not have an account?
                      <a href="/register">Sign Up</a>
                    </small>
                    <Button variant="primary" type="submit" >
                      Login
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import { Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [formUser, setFormUser] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();
  const [Pesan, setPesan] = useState('');
  const [Tampil, setTampil] = useState('');
  const [warna, setWarna] = useState('');

  //handlen login
  const handleLogin = async (e) => {
    e.preventDefault();

    //masukan data ke serve
    const loginAPI = await fetch('/api/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formUser),
    });

    const result = await loginAPI.json();

    //cek status

    if (result.status == 'success') {
      console.log(result);
      setWarna('success');
      // Simpan token ke dalam cookie
      Cookies.set('authToken', result.token);
      // Jika login berhasil, arahkan pengguna ke halaman home
      router.push('/products');
    } else if (result.status == 'fail') {
      setWarna('danger');
      setFormUser({
        username:'',
        password:'',
      })
      
    }

    setPesan(result.message);
    setTampil(true);
    console.log(result);
  };

  return (
    <>
      <div className="h-100 container-fluid">
        <div className="justify-content-center align-items-center h-100 row">
          <div className="loginContainer col-lg-12">
            <div className="p-4 d-flex justify-content-center gap-2">
              <div className="card">
                <div className="p-4 m-1 card-body">
                  <h5 className="mb-3 d-flex justify-content-center">Login</h5>
                  {/* hanya akan tampil, jika nilai dari variable 'tampil' adalah true */}
                  {Tampil && (
                    <div style={{ width: '300px' }}>
                      <Alert className="mb-0" variant={warna}>
                        {Pesan}
                      </Alert>
                    </div>
                  )}
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Username" value={formUser.username} onChange={(e) => setFormUser({ ...formUser, username: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} />
                    </Form.Group>
                    <small class="pb-4 d-block">
                      Do not have an account?
                      <a href="/register">Sign Up</a>
                    </small>
                    <Button variant="primary" type="submit" onClick={handleLogin}>
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

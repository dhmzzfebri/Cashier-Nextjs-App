'use client';
import Sidebar from '@/components/Sidebar';
import Wrapper from '@/components/Wrapper';
import { Button, Modal, Form,Table } from 'react-bootstrap';
import { useState } from 'react';

export default function Products() {
  // State untuk menampilkan Modal Box
  const [tampilkan, setTampilkan] = useState(false);

  // Handle function button untuk menampilkan button
  const handleShow = () => {
    setTampilkan(true);
  };

  // Handle function button untuk menutup modal box
  const handleClose = () => {
    setTampilkan(false);
  };

  return (
    <>
      <Sidebar />
      <Wrapper
        childrenElement={
          <>
            <div className="ms-3">
              <h2>Product</h2>
              <Button className="my-2 shadow" onClick={handleShow}>
                Tambah Product
              </Button>
            </div>

            <Modal show={tampilkan}>
              <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Tambah Barang</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Nama Barang</Form.Label>
                <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Qty</Form.Label>
                <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Decription</Form.Label>
                <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Table responsive="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Quentity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
          </>
        }
      />
    </>
  );
}

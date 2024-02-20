'use client';
import Sidebar from '@/components/Sidebar';
import Wrapper from '@/components/Wrapper';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Products() {
  const [formProduct, setFormProduct] = useState({
    name: '',
    quentity: '',
    description: '',
    price: '',
  });

  const [products, setProducts] = useState([]);
  // State untuk menyimpan id produk yang akan diedit
  const [editProductId, setEditProductId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Pemeriksaan autentikasi
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      // Jika tidak ada token autentikasi, redirect ke halaman login
      window.location.href = '/login';
    }
  }, []);

  const handleProduct = async (e) => {
    e.preventDefault();

    const productAPI = await fetch('/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formProduct),
    });

    const result = await productAPI.json();
    setProducts([...products, result.data]);

    buttonClose();
  };

  // State untuk menampilkan Modal Box
  const [tampilkan, setTampilkan] = useState(false);

  // Handle function button untuk menampilkan button
  const handleShow = () => {
    setTampilkan(true);
  };

  //handle button modal edit
  const [tampilEdit, setTampilEdit] = useState(false);
 
  const handleEdit = (id) => {
    // Mengatur id produk yang akan diedit
    setEditProductId(id);
    setTampilEdit(true);
    
    // Mengisi nilai input dengan data produk yang sesuai dengan id yang dipilih
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setFormProduct({
        name: productToEdit.name,
        quantity: productToEdit.quantity,
        description: productToEdit.description,
        price: productToEdit.price,
      });
    }
  };

  const buttonCloseEdit = () => {
    setTampilEdit(false);
  };

  // Handle function button untuk menutup modal box
  const buttonClose = () => {
    setTampilkan(false);
  };

  //fuction hapus data
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      console.log(response)
      if (response.ok) {
        // Hapus produk dari state setelah berhasil dihapus dari server
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
      console.log(response)
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
              <Modal.Header closeButton onClick={buttonClose}>
                <Modal.Title>Tambah Barang</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Nama Barang</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.name} onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Qty</Form.Label>
                <Form.Control type="number" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.quentity} onChange={(e) => setFormProduct({ ...formProduct, quentity: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Decription</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.description} onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Price</Form.Label>
                <Form.Control type="number" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.price} onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleProduct}>
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
                  <th>Price</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) &&
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(product.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                          </svg>
                        </Button>{' '}
                        <Button variant="warning" onClick={ handleEdit} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </Button>{''}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Modal show={tampilEdit}>
              <Modal.Header closeButton onClick={buttonCloseEdit}>
                <Modal.Title>Edit Barang</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Nama Barang</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.name} onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Qty</Form.Label>
                <Form.Control type="number" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.quentity} onChange={(e) => setFormProduct({ ...formProduct, quentity: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Decription</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.description} onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })} />
              </Modal.Body>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Price</Form.Label>
                <Form.Control type="number" id="inputPassword5" aria-describedby="passwordHelpBlock" value={formProduct.price} onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick="">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        }
      />
    </>
  );
}

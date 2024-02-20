import sequelize from '@/config/databases';
import ProductService from '@/service/ProductService';
import Product from "@/model/product";

export default async function handler(req, res) {
  try {
    const productService = new ProductService(sequelize, Product);

    if (req.method === "POST") {
      const addProduct = await productService.store({
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,
      });

      return res.status(200).json({
        message: "sukses menambah produk",
        data: addProduct,
      });
    } else if (req.method === "GET") {
      const products = await productService.getAll();
      return res.status(200).json(products);

    } else if (req.method === "DELETE") {
      const { id } = req.query;
      const deletedProduct = await productService.delete(id);
      if (deletedProduct) {
        return res.status(200).json({
           message: 'Product deleted successfully' 
          });
      } else {
        return res.status(404).json({
           message: 'Product not found' });
      }
    } else {
      return res.status(405).end();
    }
  } catch (err) {
    console.error('Error:', err);
    return res.json({ message: "internet error" });
  }
}

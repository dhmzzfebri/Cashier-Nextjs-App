import sequelize from '@/config/databases';
import ProductService from '@/service/ProductService';
import Product from "@/model/product";

export default async function handler(req, res) {
  try {
    const productService = new ProductService(sequelize, Product);
    
    if(req.method === "POST") {
        const addProduct = await productService.store({
            name:req.body.name,
            quantity:req.body.quantity, // Ubah menjadi quantity sesuai nama kolom di database
            description:req.body.description,
            price : req.body.price,

        });

        return res.status(200).json({
            message:"sukses menambah produk",
            data:addProduct,
        });
    } else if(req.method=== "GET") {
        const products = await productService.getAll(); // Mengambil semua produk dari database
        console.log(products);
        return res.status(200).json(products); // Mengirimkan data produk sebagai respons
    }

  } catch (err) {
    console.error('Error:', err);
    return res.json({ message: "internet error" });
  }
}

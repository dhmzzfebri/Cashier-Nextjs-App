import sequelize from '@/config/databases';
import ProductService from '@/service/ProductService';
import Product from "@/model/products";

export default async function handler(req, res) {
  try {
    const productService = new ProductService(sequelize, Product);
    
    if(req.method === "POST") {
        const addProduct = await productService.store({
            name:req.body.name,
            quentity:req.body.quentity,
            description:req.body.description,
            price : req.body.price,

        });

        return res.status(200).json({
            message:"sukses menambah produk",
            data:addProduct,
        });
    }else if(req.method=== "GET"){
        return res.status(200).json({
            message:"ini adalah method",
        });
    }

  } catch (err) {
    // console.log(err);
    return res.json({message:"internet eror"})
  }
}

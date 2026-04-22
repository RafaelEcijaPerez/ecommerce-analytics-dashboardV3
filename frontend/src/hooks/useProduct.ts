import { useState, useEffect } from "react";
import{
    getProducts,deleteProduct,createProduct,updateProduct
} from "../services/productServices";

export function useProducts(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);

    const loadProducts=async()=>{
        setLoading(true);
        const data=await getProducts();
        setProducts(data);
        setLoading(false);
    }
    useEffect(()=>{
        loadProducts();
    },[]);

    const addProduct=async(form:any)=>{
        await createProduct(form);
        await loadProducts();
    }
    const editProduct=async(id:number,form:any)=>{
        await updateProduct(id,form);
        await loadProducts();
    }
    const removeProduct=async(id:number)=>{
        await deleteProduct(id);
        await loadProducts();
    }
    return{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
    }
}
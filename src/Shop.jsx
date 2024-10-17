import './Shop.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
 
function Item({ id, name, price, img, callback, onDelete, onUpdate }) {
    return (
        <div key={id}>
            <img src={img} width={200} height={200} alt={name} /><br />
            id: {id} <br />
            name: {name}<br />
            price: {price}<br />
            <button onClick={() => onUpdate({ id, name, price, img })}>Update</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
 
export default function Shop() {
    const name_ref = useRef(null);
    const price_ref = useRef(null);
    const img_ref = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const URL = "https://redesigned-giggle-r444795rpp5q2w5p-5000.app.github.dev";
 
    useEffect(() => {
        axios.get(URL + "/api/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log("Error fetching products:", error);
            });
    }, []);
 
    const [cart, setCart] = useState([]);
 
    function addCart(item) {
        setCart([...cart, { id: item.id, name: item.name, price: item.price, img: item.img }]);
    }
 
    function remove(index) {
        setCart(cart.filter((_, i) => i !== index));
    }
 
    const productList = products.map(item => (
        <Item
            key={item.id}
            {...item}
            callback={addCart}
            onDelete={delProducts}
            onUpdate={setSelectedProduct}
        />
    ));
 
    const cartList = cart.map((item, index) => (
        <li key={index}>
            {item.name} {item.price}
            <button onClick={() => remove(index)}>Delete</button>
        </li>
    ));
 
    let total = cart.reduce((acc, item) => acc + item.price, 0);
 
    function addProduct() {
        const data = {
            name: name_ref.current.value,
            price: price_ref.current.value,
            img: img_ref.current.value
        };
 
        if (!data.name || !data.price || !data.img) {
            alert("Please fill in all fields: name, price, and image.");
            return;
        }
 
        axios.post(URL + '/api/addproduct', data)
            .then((response) => {
                console.log("Product added:", response.data);
                setProducts([...products, response.data]);
            })
            .catch((error) => {
                console.error("Error adding product:", error.response ? error.response.data : error.message);
            });
    }
 
    function delProducts(id) {
        axios.delete(`${URL}/api/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                console.log(`Product with id ${id} deleted.`);
            })
            .catch(error => {
                console.error("Error deleting product:", error.response ? error.response.data : error.message);
            });
    }
 
    function updateProducts() {
        if (!selectedProduct) return;
 
        const updatedData = {
            name: name_ref.current.value,
            price: price_ref.current.value,
            img: img_ref.current.value
        };
 
        if (!updatedData.name || !updatedData.price || !updatedData.img) {
            alert("Please fill in all fields: name, price, and image.");
            return;
        }
 
        axios.put(`${URL}/api/products/${selectedProduct.id}`, updatedData)
            .then((response) => {
                setProducts(products.map(product =>
                    product.id === selectedProduct.id ? response.data : product
                ));
                console.log("Product updated:", response.data);
                setSelectedProduct(null);
                name_ref.current.value = '';
                price_ref.current.value = '';
                img_ref.current.value = '';
            })
            .catch(error => {
                console.error("Error updating product:", error.response ? error.response.data : error.message);
            });
    }
 
    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        name_ref.current.value = product.name;
        price_ref.current.value = product.price;
        img_ref.current.value = product.img;
        window.scrollTo(0, 0); // Scroll to the top
    };
 
    return (
        <>
            <h2>{selectedProduct ? "Update Product" : "Add Product"}</h2>
            name: <input type="text" ref={name_ref} />
            price: <input type="text" ref={price_ref} />
            img: <input type="text" ref={img_ref} />
            <button type="button" onClick={selectedProduct ? updateProducts : addProduct}>
                {selectedProduct ? "Update" : "OK"}
            </button>
 
            <div className='grid-container'>{productList}</div>
 
            <h1>Cart</h1>
            <button onClick={() => setCart([])}>Clear cart</button>
            <ol>{cartList}</ol>
            <h1>Total: {total}</h1>
        </>
    );
}
import './Shop.css';
import { useState } from 'react';
 
function Item(props) {
    return (
        <div key={props.id} onClick={() => props.callback(props)}>
            <img src={props.img} width={200} height={200} alt={props.name} /><br />
            id: {props.id} <br />
            name: {props.name}<br />
            price: {props.price}<br />
        </div>
    );
}
 
export default function Shop() {
    const products = [
        { id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg" },
        { id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg" },
        { id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg" },
        { id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg" },
        { id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg" },
        { id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg" }
    ];
 
    const [cart, setCart] = useState([]);
 
    function addCart(item) {
 
        setCart([...cart, { id: item.id, name: item.name, price: item.price, img: item.img }]);
    }
 
    function remove(index) {
        let indexx=index+1;
        alert("index at"+ indexx);
        setCart(cart.filter((i, _index) => index != _index));
    }
    function remove1(index) {
       
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    }
 
    const productList = products.map(item => <Item key={item.id} {...item} callback={addCart} />);
    const cartList = cart.map((item, index) => (
        <li key={index}>
            {item.id} {item.name} {item.price}
            <button onClick={() => remove(index)}>Delete</button>
 
        </li>
    ));
 
    let total = cart.reduce((acc, item) => acc + item.price, 0);
 
    return (
        <>
            <div className='grid-container'>{productList}</div>
 
            <h1>Cart</h1>
            <button onClick={() => setCart([])}>Clear cart</button>
            <ol>{cartList}</ol>
            <h1>รวมราคาทั้งหมด {total} </h1>
        </>
    );
}
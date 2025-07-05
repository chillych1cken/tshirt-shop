import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import design1 from './assets/shirts/design1.png';
import design2 from './assets/shirts/design2.png';
import design3 from './assets/shirts/design3.png';

const products = [
  { id: 1, name: "Alpenjodsalz", price: 20, image: design1 },
  { id: 2, name: "Doch.", price: 25, image: design2 },
  { id: 3, name: "chillych1cken", price: 22, image: design3 },
];

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  const handleCheckout = async () => {
  const response = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart }),
  });

  const data = await response.json();
  window.location.href = data.url;
};

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-pink-300">
        <h1 className="text-5xl font-bold text-center">
          Welcome to T-Shirt Shop
        </h1>
      </section>

<ProductList products={products} addToCart={addToCart} />
<Cart cart={cart} setCart={setCart} />


{cart.length > 0 && (
  <button
    onClick={handleCheckout}
    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Zur Kasse
  </button>
)}

      {/* Legal Info */}
      <section className="min-h-[40vh] bg-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Info</h2>
        <p>Hbb Products. Impressum, Datenschutzerklärung, AGB, Widerrufsrecht …</p>
      </section>
    </div>
  );
}



export default App;


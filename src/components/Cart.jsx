function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="bg-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-4">Warenkorb</h2>
      {cart.length === 0 ? (
        <p>Der Warenkorb ist leer.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} x{item.qty} – €{item.price * item.qty}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={clearCart}
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Warenkorb leeren
          </button>
        </>
      )}
      <p className="mt-4">
        <strong>Gesamt:</strong> €{total}
      </p>
    </section>
  );
}

export default Cart;


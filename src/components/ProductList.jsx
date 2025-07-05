function ProductList({ products, addToCart }) {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-x-scroll flex space-x-6 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] rounded shadow bg-white border p-2 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[250px] w-full object-contain mb-2"
            />
            <p className="font-medium">{product.name}</p>
            <p>€{product.price}</p>
            <button
              className="mt-2 px-4 py-1 bg-black text-white rounded"
              onClick={() => addToCart(product)}
            >
              In den Warenkorb
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;


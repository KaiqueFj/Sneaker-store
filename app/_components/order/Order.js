export default async function Order({ order }) {
  const { id, order_items } = order;

  console.log(order_items);
  return (
    <>
      <div>
        <h2>Order ID: {order.id}</h2>

        {order_items.map((items) => {
          return (
            <div key={items.id}>
              <h3>{items.name}</h3>
            </div>
          );
        })}
        <div></div>
      </div>
    </>
  );
}

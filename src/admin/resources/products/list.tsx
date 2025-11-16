import React from "react";
import { useList } from "@refinedev/core";

export const ProductList: React.FC = () => {
  const { data, isLoading } = useList({ resource: "products", pagination: { current: 1, pageSize: 20 } });
  const items = data?.data ?? [];

  return (
    <section className="p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
      </header>
      {isLoading ? (
        <div className="text-black">Loading…</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 text-black">
              <tr>
                <th className="px-3 py-2 text-left font-medium">ID</th>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Category</th>
                <th className="px-3 py-2 text-left font-medium">Price</th>
                <th className="px-3 py-2 text-left font-medium">Store</th>
                <th className="px-3 py-2 text-left font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p: any) => (
                <tr key={p.id} className="border-t border-neutral-200">
                  <td className="px-3 py-2">{p.id}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.category}</td>
                  <td className="px-3 py-2">Rp {p.price.toLocaleString("id-ID")}</td>
                  <td className="px-3 py-2">{p.storeName}</td>
                  <td className="px-3 py-2">{p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ProductList;

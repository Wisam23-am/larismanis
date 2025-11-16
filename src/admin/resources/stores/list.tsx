import React from "react";
import { useList } from "@refinedev/core";

export const StoreList: React.FC = () => {
  const { data, isLoading } = useList({ resource: "stores", pagination: { current: 1, pageSize: 20 } });
  const items = data?.data ?? [];

  return (
    <section className="p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Stores</h1>
      </header>
      {isLoading ? (
        <div className="text-black">Loading…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s: any) => (
            <article key={s.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">{s.name}</h3>
              <p className="mt-1 text-sm text-black line-clamp-3">{s.description}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-black">
                <div>
                  <dt className="text-black">Category</dt>
                  <dd>{s.category ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-black">Rating</dt>
                  <dd>{s.rating}</dd>
                </div>
                <div>
                  <dt className="text-black">Address</dt>
                  <dd className="truncate" title={s.address}>{s.address}</dd>
                </div>
                <div>
                  <dt className="text-black">WhatsApp</dt>
                  <dd className="truncate" title={s.whatsapp}>{s.whatsapp}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default StoreList;

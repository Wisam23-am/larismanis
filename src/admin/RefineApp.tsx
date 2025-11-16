import React from "react";
import { Refine } from "@refinedev/core";
import routerBindings, { NavigateToResource } from "@refinedev/react-router-v6";
import { Routes, Route } from "react-router-dom";
import { memoryDataProvider } from "./dataProvider";
import { ProductList } from "./resources/products/list";
import { StoreList } from "./resources/stores/list";

export const RefineApp: React.FC = () => {
  return (
    <Refine
      dataProvider={memoryDataProvider}
      routerProvider={routerBindings}
      resources={[
        { name: "products", list: "/admin/products" },
        { name: "stores", list: "/admin/stores" },
      ]}
    >
      <div className="mx-auto max-w-7xl py-4 text-black">
        <Routes>
          <Route index element={<NavigateToResource resource="products" />} />
          <Route path="products" element={<ProductList />} />
          <Route path="stores" element={<StoreList />} />
        </Routes>
      </div>
    </Refine>
  );
};

export default RefineApp;

import axiosInstance from "@/service/fetcher/axiosInstance";

export default async function Home() {
  const getAllProducts = await axiosInstance.get("/products");

  return (
    <div className="min-h-screen">
      <h1>{JSON.stringify(getAllProducts.data)}</h1>
    </div>
  );
}

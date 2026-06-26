import Header from "./components/header";
import Hero from "./components/hero";
import Collections from "./components/collections";
import Products from "./components/products";

export default function Home() {
  return (
    <>
      <Header activePage="Home" />
      <main>
        <Hero />
        <Collections />
        <Products />
      </main>
    </>
  );
}

import CategoryCard from "./CategoryCard";
import categories from "../../data/categories";
import SectionTitle from "../common/SectionTitle";

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <SectionTitle
        title="Shop by Category"
        subtitle="Explore products across our most popular categories."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>

    </section>
  );
}

export default Categories;
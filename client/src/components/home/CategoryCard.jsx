function CategoryCard({ title, image }) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default CategoryCard;
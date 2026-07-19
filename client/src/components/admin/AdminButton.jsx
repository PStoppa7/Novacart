function AdminButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
    >
      {children}
    </button>
  );
}

export default AdminButton;
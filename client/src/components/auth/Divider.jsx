export default function Divider() {
  return (
    <div className="my-8 flex items-center">

      <div className="h-px flex-1 bg-white/20" />

      <span className="mx-4 text-sm text-gray-300">
        OR
      </span>

      <div className="h-px flex-1 bg-white/20" />

    </div>
  );
}
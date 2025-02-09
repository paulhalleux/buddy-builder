export function Canvas() {
  return (
    <div className="w-full aspect-[16/9]">
      <div className="min-h-full bg-white border border-neutral-200 flex">
        <iframe title="Preview" className="w-full" src="/__canvas" />
      </div>
    </div>
  );
}

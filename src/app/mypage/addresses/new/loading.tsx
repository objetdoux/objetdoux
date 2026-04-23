export default function NewAddressLoading() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="h-4 w-56 rounded-full bg-stone-200" />
        <div className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="h-8 w-48 rounded-full bg-stone-200" />
          <div className="mt-8 space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <div className="h-4 w-20 rounded-full bg-stone-200" />
                <div className="mt-3 h-12 rounded-xl bg-[#faf8f5]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

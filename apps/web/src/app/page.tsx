export default function Home() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-slate-900">
      <section className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-6xl font-semibold tracking-tight text-slate-700 sm:text-7xl dark:text-slate-50">
            daddia<span className="text-teal-600">.</span>
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-slate-500 sm:text-xl/8 dark:text-slate-400"></p>
        </div>
      </section>
      <section className="hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
            <div className="bg-slate-100/5 p-8 sm:p-10 dark:bg-white/5"></div>
            <div className="bg-slate-100/5 p-6 sm:p-10 dark:bg-white/5"></div>
            <div className="bg-slate-100/5 p-6 sm:p-10 dark:bg-white/5"></div>
            <div className="bg-slate-100/5 p-6 sm:p-10 dark:bg-white/5"></div>
            <div className="bg-slate-100/5 p-6 sm:p-10 dark:bg-white/5"></div>
            <div className="bg-slate-100/5 p-6 sm:p-10 dark:bg-white/5"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

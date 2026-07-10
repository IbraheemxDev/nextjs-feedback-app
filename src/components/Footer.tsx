import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:gap-6">
        <div className="text-center md:text-left">
          <h3 className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
           True Feedback
          </h3>

          <p className="mt-2 text-sm text-slate-500 max-w-xs">
            Receive honest feedback while staying anonymous.
          </p>
        </div>

        <div className="flex items-center gap-6 md:gap-8 text-sm text-slate-400">
          <Link
            href="/"
            className="relative transition-colors duration-200 hover:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-indigo-400 after:transition-all after:duration-200 hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/sign-in"
            className="relative transition-colors duration-200 hover:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-indigo-400 after:transition-all after:duration-200 hover:after:w-full"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="relative transition-colors duration-200 hover:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-indigo-400 after:transition-all after:duration-200 hover:after:w-full"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 px-6 text-center text-xs md:text-sm text-slate-500">
        © {new Date().getFullYear()} MysteryMessage. Built with{" "}
        <span className="text-indigo-400">❤</span> using Next.js, TypeScript
        &amp; Tailwind CSS.
      </div>
    </footer>
  );
}
export default function LoginCover() {
  return (
    <section
      className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e1b4b] via-[#2e1c8c] to-[#4f46e5] relative overflow-hidden flex-col justify-center px-16"
      aria-label="EduCanvas platform overview"
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Welcome to EduCanvas
        </h1>
        <p className="mt-6 text-base lg:text-lg text-indigo-100/80 leading-relaxed font-light">
          Generate and export syllabus tables in seconds, coordinate with classroom
          materials, and access AI help logs.
        </p>
      </div>
    </section>
  );
}


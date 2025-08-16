export default function TopGradientButton() {
    return (
        <button className="relative px-8 py-2 rounded-full bg-slate-700 text-white text-sm border border-slate-600 transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]">
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-10">Top Gradient</span>
        </button>
    );
}

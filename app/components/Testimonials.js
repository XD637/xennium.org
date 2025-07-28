
const testimonials = [
    {
        quote: "Xennium is the way of future utility token.",
        author: "Flexispy"
    },
    {
        quote: "I love building the next gen crypto community.",
        author: "KOL, Xennium"
    },
    {
        quote: "Xennium simply means one equals zero",
        author: "Admin, Xennium"
    }
];


const Testimonials = () => (

    <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10 text-center pt-8 tracking-wide">
            What People Are Saying
        </h2>
        <div className="relative flex flex-col md:flex-row gap-8 max-w-5xl mx-auto items-stretch justify-center">
            {/* Modern connector for md+ screens */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-8 pointer-events-none z-0">
                <div className="relative w-full h-full flex items-center justify-between">
                    {/* Horizontal glowing line */}
                    <div className="absolute left-[16.5%] right-[16.5%] top-1/2 h-1 bg-gradient-to-r from-purple-700/30 via-purple-400/60 to-purple-700/30 blur-sm rounded-full" style={{ zIndex: 1 }}></div>
                </div>
            </div>
            {/* Testimonial Cards */}
            {testimonials.map((t, i) => (
                <div
                    key={i}
                    className="relative flex flex-col items-center bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 transition-transform duration-300 hover:scale-105 hover:border-purple-700 group z-10"
                >
                    <p className="text-lg text-gray-200 italic mb-4 text-center">“{t.quote}”</p>
                    {t.author && <div className="text-purple-400 font-bold text-center text-md">{t.author}</div>}
                </div>
            ))}
        </div>
    </section>
);

export default Testimonials;

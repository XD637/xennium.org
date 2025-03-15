const HeroSection = () => {
  return (
    <main className="relative flex flex-col items-center justify-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6 pb-16">
      <h1 className="pt-10 text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-900">
        Xennium - Next Gen Crypto
      </h1>
      <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto tracking-wide">
        Xennium (XENX) is built on{" "}
        <span className="text-purple-500 font-medium px-2">Polygon PoS</span>. 
        With its unique property,{" "}
        <span className="text-purple-500 font-medium px-2">
          &apos;Last Coin Transfer Restriction (LCTR)&apos;
        </span>, 
        the last coin in any wallet is now{" "}
        <span className="text-purple-500 font-medium px-2">Locked Forever!</span>
      </p>
    </main>
  );
};

export default HeroSection;

'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const CONTRACT_ADDRESS = "HK9MQpZc2GfwCbd3fVyCCwcD8xdw94U6KuWigqG8pump";
  const PUMPFUN_URL = "https://pump.fun/coin/HK9MQpZc2GfwCbd3fVyCCwcD8xdw94U6KuWigqG8pump";
  const [copied, setCopied] = useState(false);

  const [tokenData, setTokenData] = useState({
    marketCap: "Loading...",
    price: "Loading...",
  });

  const copyContract = async () => {
  await navigator.clipboard.writeText(CONTRACT_ADDRESS);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  const fetchTokenData = async () => {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
      );

      const data = await res.json();
      const pair = data.pairs?.[0];

      if (pair) {
        setTokenData({
          marketCap: pair.marketCap
            ? `$${Number(pair.marketCap).toLocaleString()}`
            : "N/A",
          price: pair.priceUsd
            ? `$${pair.priceUsd}`
            : "N/A",
        });
      }
    } catch (error) {
      console.error("Failed to fetch token data:", error);
    }
  };

  fetchTokenData();

  const interval = setInterval(fetchTokenData, 30000);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearInterval(interval);
  };
}, [CONTRACT_ADDRESS]);
  return (

      <main
        className="relative min-h-screen bg-[#081811] text-white overflow-x-hidden"
        onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      >

        {/* Global mouse glow */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-0"
            animate={{
              background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px,rgba(110,231,168,0.14),transparent 65%)`,
            }}
            transition={{ type: "tween", ease: "linear", duration: 0.08 }}
          />

      {/* Forest Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,...))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(...))]" />

      {/* Fog layer */}
        <div className="absolute bottom-0 w-full h-[250px] bg-gradient-to-t from-[#08181...]" />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Forest Particles */}
{[...Array(80)].map((_, i) => {
  const size = 4 + (i % 4)
  const left = (i * 13) % 100
  const top = (i * 17) % 100

  return (
    <motion.div
      key={i}
      className="absolute rounded-full bg-[#6EE7A8]"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: 4 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
})}
</div>
        {/* Navbar */}
        <motion.nav
  initial={{ y: -30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl px-2">
  <div
    className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
      scrolled
    ? "border-white/15 bg-black/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    : "border-white/8 bg-transparent"
  } px-4 md:px-8 py-3 md:py-4`}>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileTap={{ scale: 0.92 }}
          className="group relative flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer"
>
      {/* Leaf icon */}
        <motion.div
          className="relative w-9 h-9 flex items-center justify-center"
          animate={{
          rotate: [0, 3, -3, 0],
          scale: [1, 1.05, 1],
        }}
          transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
>
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <path
        d="M24 6C34 10 40 20 36 32C28 40 16 40 10 30C8 18 14 10 24 6Z"
        fill="#538d11ff"
      />
      <path
        d="M16 28C22 22 28 18 34 14"
        stroke="#ECFDF5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="35" cy="10" r="2" fill="#4e5f2fff" />
    </svg>
        </motion.div>

      {/* Logo text */}
        <div className="relative">
          <span className="text-xl sm:text-2xl md:text-4xl font-black tracking-[0.18em] ...">
                MIBU
          </span>

          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#6EE7A8] to-[#A7F3D0] transition-all duration-300 group-hover:w-full"></span>
        </div>
        </motion.button>

            {/* Desktop menu */}
              <div className="hidden md:flex gap-8 text-gray-300">
                <a href="#about" className="hover:text-white transition">About</a>
                <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
                <a href="#gallery" className="hover:text-white transition">Gallery</a>
                <a href="#tokenomics" className="hover:text-white transition">Tokenomics</a>
                <a href="#faq" className="hover:text-white transition">FAQ</a>
              </div>

            {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 rounded-xl border border-[#6EE7A8]/20 bg-[#10231B]/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span className="w-5 h-0.5 bg-[#6EE7A8]" />
        <span className="w-5 h-0.5 bg-[#6EE7A8]" />
        <span className="w-5 h-0.5 bg-[#6EE7A8]" />
      </button>
    </div>
  </motion.nav>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-40 w-fit rounded-[28px] border border-white/10 bg-[#081811] backdrop-blur-2xl px-10 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:hidden">
          <div className="flex flex-col gap-5 text-lg">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#6EE7A8] hover:text-white">About</a>
            <a href="#roadmap" onClick={() => setMobileMenuOpen(false)} className="text-[#6EE7A8] hover:text-white">Roadmap</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-[#6EE7A8] hover:text-white">Gallery</a>
            <a href="#tokenomics" onClick={() => setMobileMenuOpen(false)} className="text-[#6EE7A8] hover:text-white">Tokenomics</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[#6EE7A8] hover:text-white">FAQ</a>
          </div>
        </motion.div>)}

        {/* Hero */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-16 md:pb-24 grid lg:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden">
          {/* Hero Stickers (responsive & attached to hero) */}
          <motion.img
            src="/stickers/buddy1.png"
            alt="Hi Buddy"
            className="absolute top-24 left-4 md:top-20 md:left-6 w-16 h-16 md:w-20 md:h-20 z-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/stickers/buddy2.png"
            alt="Astronaut Buddy"
            className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 z-20"
            animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/stickers/buddy3.png"
            alt="Crypto Buddy"
            className="absolute top-20 right-4 md:top-20 md:right-8 w-16 h-16 md:w-20 md:h-20 z-20"
            animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right Illustration */}
<motion.div
  className="flex justify-center perspective-[1200px]"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{
    opacity: 1,
    scale: 1,
    x: (mouse.x - 600) * 0.015,
    y: [0, -10, 0, (mouse.y - 350) * 0.015],
  }}
  transition={{
    opacity: { duration: 1 },
    scale: { duration: 1 },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    rotateY: 10,
    rotateX: -8,
    scale: 1.05,
  }}
>
  <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[500px] lg:max-w-[620px] aspect-[620/680] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_50px_140px_rgba(110,231,168,0.18)] flex items-center justify-center overflow-hidden mx-auto">
    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(110,231,168,0.18),_transparent_65%)]" />

    <motion.img
      style={{
        x: (mouse.x - 600) * 0.01,
        y: (mouse.y - 350) * 0.01,
      }}
      src="/mibuu.png"
      alt="MiBU Character"
      className="relative z-10 w-[100%] max-w-[180px] sm:max-w-[220px] md:max-w-[420px] h-auto object-contain mx-auto"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
</motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-[#6EE7A8] uppercase tracking-[0.3em] mb-4">
              Mind + Buddy
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
              A little buddy
              <br />
              with a big heart.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-6 mb-6 max-w-xs">
              Built with kindness. Growing one buddy at a time.
              A forest-born meme coin community on Solana.
            </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
             {/* Buy Button */}
            <a
              href={PUMPFUN_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-green-400/40 bg-green-500/10 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all duration-300 hover:scale-105 hover:bg-green-500 hover:text-black hover:border-green-300 hover:shadow-[0_0_45px_rgba(34,197,94,0.45)]"
            >
              Buy $MIBU
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
              {/* Contract Address */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-green-800 bg-green-950/40">
            <span className="text-sm text-gray-300 font-mono tracking-wide">
              CA: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-6)}
            </span>

          <button
            onClick={copyContract}
            className="px-3 py-1.5 rounded-full border border-green-600 bg-green-900/40 text-green-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-300"
          >
            Copy
          </button>
        </div>
        </div>
      </motion.div>
    </section>

      {/* About MiBU */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28">
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 1,
      ease: "easeOut",
    }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center"
  >
    {/* Left Image */}
    <motion.img
      src="/miibu.png"
      alt="MiBU Character"
      className="w-[220px] sm:w-[280px] lg:w-[380px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] mx-auto"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Right Text */}
    <div className="text-center lg:text-left">
      <p className="select-text text-[#6EE7A8] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4 text-sm md:text-base">
        About MiBU
      </p>

      <h3 className="select-text text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
        Kindness always finds its way back.
      </h3>

      <p className="select-text text-base md:text-lg text-gray-300 leading-7 md:leading-8 mb-6 md:mb-8">
        MiBU is a little forest buddy who believes that kindness creates
        stronger communities. Every small act of care makes the forest a
        little brighter, and every friend matters.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="group relative rounded-2xl border border-green-500/30 bg-[#0b1f17]/80 p-4 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-green-300 hover:shadow-[0_0_60px_rgba(34,197,94,0.45)] cursor-pointer">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Chain</p>
          <p className="text-base sm:text-xl font-semibold">Solana</p>
        </div>

        <div className="group relative rounded-2xl border border-green-500/30 bg-[#0b1f17]/80 p-4 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-green-300 hover:shadow-[0_0_60px_rgba(34,197,94,0.45)] cursor-pointer">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Focus</p>
          <p className="text-base sm:text-xl font-semibold">Community</p>
        </div>

        <div className="group relative rounded-2xl border border-green-500/30 bg-[#0b1f17]/80 p-4 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-green-300 hover:shadow-[0_0_60px_rgba(34,197,94,0.45)] cursor-pointer">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Spirit</p>
          <p className="text-base sm:text-xl font-semibold">Kindness</p>
        </div>
      </div>
    </div>
  </motion.div>
</section>

      {/* Roadmap */}
       <section id="roadmap" className="max-w-7xl mx-auto px-6 md:px-8 pt-24 md:pt-40 pb-20 md:pb-36 relative">
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
  >
    <div className="text-center mb-20">
      <p className="text-[#6EE7A8] uppercase tracking-[0.3em] mb-4">
        Roadmap
      </p>
      <h2 className="text-4xl lg:text-6xl font-bold mb-6">
        The MiBU forest journey
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        Every phase is a step deeper into the forest. MiBU grows together
        with the community.
      </p>
    </div>

    {/* Timeline line */}
    <div className="absolute left-1/2 top-[50px] bottom-10 w-[3px] -translate-x-1/2">
    </div>
    <div className="relative space-y-20"
>
      {/* Glowing forest trail */}
          <div className="absolute left-1/2 top-[10px] bottom-20 w-[2px] -translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-[#6EE7A8] via-[#6EE7A8]/40 to-transparent blur-sm" />

      {/* Moving light */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-40 sm:h-56 rounded-full bg-[#A7F3D0] shadow-[0_0_10px_rgba(167,243,208,0.5)]"
          animate={{
          top: ["0%", "100%", "0%"],
        }}
          transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
      {[
  {
    phase: "Phase 1",
    title: "A little buddy",
    image: "/stickers/baby.png",
    text: "MiBU was born in the heart of the forest, a small and kind companion wandering along quiet woodland paths with a little backpack and a gentle heart. In this phase, MiBU discovers a place to call home.",
  },
  {
    phase: "Phase 2",
    title: "The first friends",
    image: "/stickers/hungry.png",
    text: "One day, while resting beneath a great old tree, MiBU is approached by two little sparrows. MiBU shares fresh apples with them, and that simple act of kindness becomes the beginning of the very first friendship.",
  },
  {
    phase: "Phase 3",
    title: "The forest community",
    image: "/stickers/hi-buddy.png",
    text: "More and more forest animals begin to gather around MiBU, drawn by kindness and friendship. Expressions, artwork, stories, and shared moments start to shape the MiBU world.",
  },
  {
    phase: "Phase 4",
    title: "A brighter forest",
    image: "/stickers/whale.png",
    text: "MiBU is no longer alone. What began as a simple friendship grows into a united community built on kindness, sharing, storytelling, collaboration, creativity, and collective growth.",
  },
]
.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.1 }}
    className={`grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10 items-center ${
      index % 2 === 0 ? "" : "[&>div:first-child]:order-2"
    }`}
  >
    <div
      className={`${
        index % 2 === 0 ? "pr-2 sm:pr-6 lg:pr-20" : "pl-2 sm:pl-6 lg:pl-20"
      }`}
    >
      <div className="rounded-[16px] sm:rounded-[24px] lg:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-[#6EE7A8]/50 hover:bg-white/10 hover:shadow-[0_0_50px_rgba(110,231,168,0.25)] hover:-translate-y-2">
        <p className="text-[#6EE7A8] uppercase tracking-[0.1em] sm:tracking-[0.25em] text-xs sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-3 lg:mb-4">
          {item.phase}
        </p>
        <h3 className="text-base sm:text-2xl lg:text-4xl font-bold mb-1.5 sm:mb-3">
          {item.title}
        </h3>
        <p className="text-xs sm:text-base lg:text-xl text-gray-300 leading-5 sm:leading-7 lg:leading-9">
          {item.text}
        </p>
      </div>
      </div>

    {/* Center icon */}
      <div className="relative flex justify-center">
        <motion.div
          className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full bg-[#6EE7A8]/10 border border-[#6EE7A8]/30 flex items-center justify-center shadow-[0_0_60px_rgba(110,231,168,0.90)]"
          animate={{
            scale: [1, 1.08, 1],
            y: [0, -6, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
            transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
>
    <img
      src={item.image}
      alt={item.title}
      className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain"
    />
  </motion.div>
</div>
  </motion.div>
))}
    </div>
  </motion.div>
</section>

        {/* Sticker Gallery */}

<section id="gallery" className="max-w-7xl mx-auto px-8 py-5">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}>
    <div className="text-center mb-16">
      <p className="text-[#6EE7A8] uppercase tracking-[0.3em] mb-4">
        MiBU gallery
      </p>
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">
        Meet the MiBU buddies
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        Every MiBU sticker tells a different story. A little buddy with many
        expressions, adventures, and friendships.
      </p>
    </div>

    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#081811] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#081811] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex flex-row gap-3 sm:gap-4 lg:gap-6 w-max"
        animate={{ x: [0, -1200] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[
          "/stickers/baby.png",
          "/stickers/hungry.png",
          "/stickers/hi-buddy.png",
          "/stickers/whale.png",
          "/stickers/buddy1.png",
          "/stickers/buddy2.png",
          "/stickers/buddy3.png",

          // duplicate for seamless loop
          "/stickers/baby.png",
          "/stickers/hungry.png",
          "/stickers/hi-buddy.png",
          "/stickers/whale.png",
          "/stickers/buddy1.png",
          "/stickers/buddy2.png",
          "/stickers/buddy3.png",
        ].map((src, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
              scale: 1.08,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-[110px] sm:w-[160px] lg:w-[260px] rounded-[16px] sm:rounded-[24px] lg:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-5 lg:p-8 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:border-[#6EE7A8]/40 hover:shadow-[0_0_40px_rgba(110,231,168,0.25)]"
          >
            <img
              src={src}
              alt="MiBU Sticker"
              className="w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] lg:w-[220px] lg:h-[220px] object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.div>
</section>

          <section
  id="tokenomics"
  className="max-w-7xl mx-auto px-6 md:px-8 py-10 sm:py-14 lg:py-20"
>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {/* Header */}
    <div className="text-center mb-8 sm:mb-16">
      <p className="text-[#6EE7A8] uppercase tracking-[0.3em] mb-4">
        Tokenomics
      </p>

      <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-6">
        A fair forest economy
      </h2>

      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        Live token statistics directly connected to the MiBU ecosystem on
        Solana.
      </p>
    </div>

    {/* Live Token Stats */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto"
    >
      <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] border border-[#6EE7A8]/20 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(110,231,168,0.12)] hover:border-[#6EE7A8]/40 hover:shadow-[0_0_50px_rgba(110,231,168,0.18)] transition-all duration-500">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
            Live token stats
          </h3>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10">
          <span className="w-2 h-2 rounded-full bg-[#6EE7A8] animate-pulse"></span>
          <span className="text-xs font-medium text-[#6EE7A8]">
            LIVE
          </span>
        </div>
      </div>
      
        <div className="space-y-6">

          {/* Total Supply */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm sm:text-base">
              Total supply
            </span>

            <span className="font-semibold text-white text-sm sm:text-base">
              1,000,000,000 MIBU
            </span>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Market Cap */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm sm:text-base">
              Market cap
            </span>

            <span className="font-semibold text-white text-sm sm:text-base">
              {tokenData.marketCap}
            </span>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm sm:text-base">
              Price
            </span>

            <span className="font-semibold text-white text-sm sm:text-base">
              {tokenData.price}
            </span>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Bonding Progress */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm sm:text-base">
              Bonding progress
            </span>

            <span className="font-semibold text-[#6EE7A8] text-sm sm:text-base">
              10%
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  </motion.div>
</section>

        {/* Premium Footer */}
<footer className="mt-1 border-t border-[#1f4d37] bg-[#0B1F17]/90 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 sm:py-12">

    <div className="flex flex-row justify-between gap-2 sm:gap-6 md:gap-10">

      {/* Brand */}
      <div className="flex-1 max-w-[40%] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3 md:mb-5">
          <img
            src="/stickers/buddy1.png"
            alt="MIBU"
            className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
          />

          <h3 className="text-[10px] sm:text-sm md:text-lg font-black tracking-[0.05em] sm:tracking-[0.12em] text-[#6EE7A8]">
            MIBU
          </h3>
        </div>

        <p className="text-[7px] sm:text-xs md:text-sm text-white/70 leading-tight mb-1.5 sm:mb-3">
          A little buddy with a big heart.
        </p>

        <p className="text-[8px] sm:text-xs md:text-base text-white/70 leading-tight sm:leading-snug md:leading-7">
          Built with kindness, friendship, and community on the Solana
          ecosystem.
        </p>
      </div>

      {/* Explore */}
      <div className="flex-shrink-0">
        <h4 className="text-[9px] sm:text-sm md:text-lg text-[#6EE7A8] font-bold uppercase tracking-[0.05em] sm:tracking-[0.18em] mb-1.5 sm:mb-3 md:mb-5">
          Explore
        </h4>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 text-[8px] sm:text-xs md:text-base text-white/70">
          <a href="#about" className="hover:text-[#6EE7A8] transition">
            About
          </a>
          <a href="#roadmap" className="hover:text-[#6EE7A8] transition">
            Roadmap
          </a>
          <a href="#gallery" className="hover:text-[#6EE7A8] transition">
            Gallery
          </a>
          <a href="#tokenomics" className="hover:text-[#6EE7A8] transition">
            Tokenomics
          </a>
        </div>
      </div>

      {/* Community */}
      <div className="flex-shrink-0 text-right sm:text-left">
        <h4 className="text-[9px] sm:text-sm md:text-lg text-[#6EE7A8] font-bold uppercase tracking-[0.05em] sm:tracking-[0.18em] mb-1.5 sm:mb-3 md:mb-5">
          Community
        </h4>
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 text-[8px] sm:text-xs md:text-base text-white/70">             <a
            href="https://x.com/Yuhuuuuuyyy99"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6EE7A8] transition">
              X (Twitter)
          </a>
          <a href="https://t.me/+SH1Mpzhoa4owMGQ1"
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-[#6EE7A8] transition">
              Telegram
          </a>
        </div>
      </div>

    </div>

    <div className="border-t border-white/10 mt-6 sm:mt-10 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 text-[9px] sm:text-sm md:text-base text-gray-400">
      <p>© 2026 MIBU. All rights reserved.</p>

      <p className="text-center md:text-right">
        Built with kindness on Solana.
      </p>
    </div>
  </div>

          {/* FAQ */}
<section id="faq" className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-14 sm:pb-24">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <div className="text-center mb-8 sm:mb-16">
      <p className="text-[#6EE7A8] uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-2 sm:mb-4 text-xs sm:text-base">
        FAQ
      </p>

      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6">
        Frequently asked questions
      </h2>

      <p className="text-gray-300 text-xs sm:text-lg max-w-2xl mx-auto">
        Everything you need to know about MiBU and how to join the forest.
      </p>
    </div>

    <div className="space-y-2.5 sm:space-y-5">

      {/* Item 1 */}
      <details className="group rounded-[16px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 transition-all duration-300 open:border-[#6EE7A8]/40 open:shadow-[0_0_30px_rgba(110,231,168,0.15)]">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
          <span className="text-xs sm:text-xl font-semibold">
            What is MiBU?
          </span>

          <span className="text-[#6EE7A8] text-lg sm:text-3xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
            +
          </span>
        </summary>

        <div className="mt-2.5 sm:mt-5 text-gray-300 text-[11px] sm:text-base leading-5 sm:leading-8">
          MiBU is a community-driven meme token built on Solana, inspired by
          kindness, friendship, and long-term community growth.
        </div>
      </details>

      {/* Item 2 */}
      <details className="group rounded-[16px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 transition-all duration-300 open:border-[#6EE7A8]/40 open:shadow-[0_0_30px_rgba(110,231,168,0.15)]">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
          <span className="text-xs sm:text-xl font-semibold">
            How can I buy $MIBU?
          </span>

          <span className="text-[#6EE7A8] text-lg sm:text-3xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
            +
          </span>
        </summary>

        <div className="mt-2.5 sm:mt-5 text-gray-300 text-[11px] sm:text-base leading-5 sm:leading-8">
          You can buy $MIBU through Phantom Wallet and supported Solana
          platforms such as Pump.fun once the token is live.
        </div>
      </details>

      {/* Item 3 */}
      <details className="group rounded-[16px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 transition-all duration-300 open:border-[#6EE7A8]/40 open:shadow-[0_0_30px_rgba(110,231,168,0.15)]">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
          <span className="text-xs sm:text-xl font-semibold">
            Is MiBU built on Solana?
          </span>

          <span className="text-[#6EE7A8] text-lg sm:text-3xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
            +
          </span>
        </summary>

        <div className="mt-2.5 sm:mt-5 text-gray-300 text-[11px] sm:text-base leading-5 sm:leading-8">
          Yes. MiBU is built on the Solana blockchain for fast transactions,
          low fees, and strong community accessibility.
        </div>
      </details>

      {/* Item 4 */}
      <details className="group rounded-[16px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 transition-all duration-300 open:border-[#6EE7A8]/40 open:shadow-[0_0_30px_rgba(110,231,168,0.15)]">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
          <span className="text-xs sm:text-xl font-semibold">
            What is the total supply?
          </span>

          <span className="text-[#6EE7A8] text-lg sm:text-3xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
            +
          </span>
        </summary>

        <div className="mt-2.5 sm:mt-5 text-gray-300 text-[11px] sm:text-base leading-5 sm:leading-8">
          The total supply of MiBU is <strong>1,000,000,000 $MIBU</strong>, designed with
          a transparent and community-first allocation model.
        </div>
      </details>

      {/* Item 5 */}
      <details className="group rounded-[16px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 transition-all duration-300 open:border-[#6EE7A8]/40 open:shadow-[0_0_30px_rgba(110,231,168,0.15)]">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
          <span className="text-xs sm:text-xl font-semibold">
            Where can I join the community?
          </span>

          <span className="text-[#6EE7A8] text-lg sm:text-3xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
            +
          </span>
        </summary>

        <div className="mt-2.5 sm:mt-5 text-gray-300 text-[11px] sm:text-base leading-5 sm:leading-8">
          You can join the MiBU community through our official X (Twitter),
          Telegram, and other social platforms linked on this website.
        </div>
      </details>

    </div>
  </motion.div>
</section>

</footer>
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border border-green-500/30 bg-[#0b1f17]/90 text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.35)] backdrop-blur-md transition-all duration-300">
          ✓ Contract address copied
        </div>
      )}
    </main>
  );
}
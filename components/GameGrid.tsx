import GameCard from "./GameCard";
import { GiPokerHand, GiSoccerBall } from "react-icons/gi";
import { MdOutlineFlightTakeoff, MdOutlineCasino } from "react-icons/md";

const games = [
  {
    title: "Lottery",
    description: "Try your luck with daily draws and massive jackpot prizes.",
    icon: <GiPokerHand />,
    gradient: "from-primary-600 to-primary-800",
    badge: "Jackpot Daily",
  },
  {
    title: "Aviator",
    description: "Ride the multiplier wave before the plane flies away.",
    icon: <MdOutlineFlightTakeoff />,
    gradient: "from-danger-500 to-rose-700",
    badge: "Most Popular",
  },
  {
    title: "Slots",
    description: "Spin premium reels with stunning visuals and big wins.",
    icon: <MdOutlineCasino />,
    gradient: "from-gold-600 to-gold-700",
  },
  {
    title: "Sports",
    description: "Bet live on cricket, football and all your favourite sports.",
    icon: <GiSoccerBall />,
    gradient: "from-success-500 to-emerald-700",
    badge: "Live Now",
  },
];

export default function GameGrid() {
  return (
    <section id="games" className="relative py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(139,92,246,0.035) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="glowing-badge glowing-badge-primary mb-4">Choose Category</span>
          <h2 className="font-mono text-3xl font-black tracking-wider text-white sm:text-4xl">
            CHOOSE YOUR ARENA
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#94A3B8]">
            Explore our premium collection of games designed for thrill-seekers and winners alike.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => (
            <GameCard key={game.title} {...game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type DigitalClockProps = {
  currentTime: string;
};

export const DigitalClock = ({ currentTime }: DigitalClockProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10 p-8 text-center">
      <div className="relative z-10">
        <h2 className="text-6xl md:text-8xl font-mono font-bold text-primary tracking-tighter tabular-nums">
          {currentTime || "00:00:00"}
        </h2>
        <p className="text-primary/70 font-medium mt-2 tracking-widest uppercase text-sm">
          Waktu Indonesia Barat
        </p>
      </div>
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
    </div>
  );
};

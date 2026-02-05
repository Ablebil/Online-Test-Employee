export const formatTime = (date?: Date | string | null): string => {
  if (!date) return "--:--";
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateWorkDuration = (
  checkIn?: Date | string | null,
  checkOut?: Date | string | null,
): string => {
  if (!checkIn || !checkOut) return "-";

  const startTime = new Date(checkIn);
  const endTime = new Date(checkOut);

  const durationMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} Jam ${minutes.toString().padStart(2, "0")} Menit`;
};

export const formatFullDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatShortDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDayName = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
  });
};

export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 19) return "Selamat Sore";
  return "Selamat Malam";
};

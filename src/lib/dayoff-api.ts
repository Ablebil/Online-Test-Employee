export interface DayOffAPIResponse {
  tanggal: string;
  tanggal_display: string;
  keterangan: string;
  is_cuti: boolean;
}

export interface Holiday {
  date: string;
  displayDate: string;
  description: string;
  isLeave: boolean;
}

const DAYOFF_API_BASE_URL = "https://dayoffapi.vercel.app/api";

export async function getHolidays(
  month?: number,
  year?: number,
): Promise<Holiday[]> {
  try {
    const params = new URLSearchParams();
    if (month) params.append("month", month.toString());
    if (year) params.append("year", year.toString());

    const url = `${DAYOFF_API_BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // disable cache for realtime data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.statusText}`);
    }

    const data: DayOffAPIResponse[] = await response.json();
    return Array.isArray(data)
      ? data.map((item) => ({
          date: item.tanggal,
          displayDate: item.tanggal_display,
          description: item.keterangan,
          isLeave: item.is_cuti,
        }))
      : [];
  } catch (error) {
    console.error("Error fetching holidays from DayOff API:", error);
    return [];
  }
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

const parseTime = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const getPeriod = (minutes: number): 'Morning' | 'Afternoon' | 'Evening' => {
  if (minutes < 12 * 60) return 'Morning';
  if (minutes < 17 * 60) return 'Afternoon';
  return 'Evening';
};

export const generateTimeSlots = (
  openTime: string, 
  closeTime: string, 
  intervalMinutes: number = 30
): TimeSlot[] => {
  const startMins = parseTime(openTime);
  const endMins = parseTime(closeTime);
  const slots: TimeSlot[] = [];

  for (let m = startMins; m < endMins; m += intervalMinutes) {
    slots.push({
      time: formatTime(m),
      isAvailable: true,
      period: getPeriod(m)
    });
  }

  return slots;
};

 export const getYouTubeThumbnail = (videoUrl: string): string | null => {
  const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export const removeUndefinedFields = (obj: any): any => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== undefined)
  );
};

export const formatDate = (date: string | Date | undefined): string => {
  if(!date) return "No date found!";
  return new Date(date).toLocaleDateString();
}

export const formatTime = (time: Date | string) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const timeAgo = (date: Date): string => {
  const now = new Date();
  const inputDate = new Date(date);
  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const intervals = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.name}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function copyDay(_date: Date, _dateForCopy: Date): Date {
  const date = new Date(_date);
  const dateForCopy = new Date(_dateForCopy);
  
  // Extract the year, month, and day from the date
  const year = dateForCopy.getFullYear();
  const month = dateForCopy.getMonth();
  const day = dateForCopy.getDate();

  // Create a new Date object with the same time but the day from date
  const adjustedDate = new Date(year, month, day, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

  return adjustedDate;
}
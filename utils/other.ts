export const createChatHref = (id1: string, id2: string) => {
	const id = createChatId(id1, id2);

	return `/dashboard/chat/${id}`;
};

export const createChatId = (id1: string, id2: string) => {
	const sorted = [id1, id2].sort();

	return `${sorted[0]}--${sorted[1]}`;
}

export const getRelativeTime = (ms: number, locale: string = "en"): string => {
  const formatter = new Intl.RelativeTimeFormat(locale);
  const diffInSecs = (Date.now() - ms) / 1000;
  
  if (diffInSecs < 1) {
    return "just now";
  } else if (diffInSecs < 60) {
    return formatter.format(Math.floor(-diffInSecs), "seconds");
  } else if (diffInSecs < 3600) {
    return formatter.format(Math.floor(-diffInSecs / 60), "minutes");
  } else if (diffInSecs < 86400) {
    return formatter.format(Math.floor(-diffInSecs / 3600), "hours");
  } else if (diffInSecs < 2620800) {
    return formatter.format(Math.floor(-diffInSecs / 86400), "days");
  } else if (diffInSecs < 31449600) {
    return formatter.format(Math.floor(-diffInSecs / 2620800), "months");
  } else {
    return formatter.format(Math.floor(-diffInSecs / 31449600), "years");
  }
};


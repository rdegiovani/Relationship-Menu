/**
 * Formats a date into a relative time string (e.g., "5 minutes ago", "2 days ago")
 *
 * Delegates the wording to Intl.RelativeTimeFormat so every language gets
 * correct plurals and phrasing ("2 days ago", "vor 2 Tagen", "há 2 dias")
 * without a hand-written table per locale.
 */
export function formatRelativeTime(date: Date, locale?: string): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeUnits: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 60 * 60 * 24 * 365 },
    { unit: 'month', seconds: 60 * 60 * 24 * 30 },
    { unit: 'week', seconds: 60 * 60 * 24 * 7 },
    { unit: 'day', seconds: 60 * 60 * 24 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];

  // `numeric: 'auto'` is what turns 0 seconds into "now" and 1 day into
  // "yesterday" rather than "0 seconds ago" / "1 day ago".
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  // If less than a minute, return "just now"
  if (diffInSeconds < 60) {
    return formatter.format(0, 'second');
  }

  // Find the appropriate time unit
  for (const { unit, seconds } of timeUnits) {
    const value = Math.floor(diffInSeconds / seconds);

    if (value >= 1) {
      return formatter.format(-value, unit);
    }
  }

  return formatter.format(0, 'second');
}

/**
 * Formats a date into a readable local date string
 */
export function formatDate(date: Date, locale?: string): string {
  try {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    // Fallback for older browsers
    return date.toLocaleString(locale);
  }
}

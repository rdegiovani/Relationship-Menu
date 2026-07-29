export function getItemClassName(iconType: string | null | undefined) {
  if (!iconType) return 'item-not-set';
  return `item-${iconType}`;
}

export function getItemSpanClasses(iconType: string | null | undefined) {
  // Side padding proportional to the 1em corner radius, so the text never
  // touches the curved corners and the box reads balanced against py.
  const baseClasses = 'rounded-[1em_0_1em_0] py-[3px] px-[10px]';

  if (!iconType) return baseClasses;

  switch(iconType) {
    case 'must':
      return `${baseClasses} item-marker-must`;
    case 'like':
      return `${baseClasses} item-marker-like`;
    case 'maybe':
      return `${baseClasses} item-marker-maybe`;
    case 'prefer-not':
      return `${baseClasses} item-marker-prefer-not`;
    case 'off-limit':
      return `${baseClasses} item-marker-off-limit`;
    default:
      return baseClasses;
  }
} 
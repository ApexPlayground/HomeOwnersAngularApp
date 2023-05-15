/**
 * Filters an array of items based on a search term.
 * @param items An array of strings to be filtered.
 * @param searchTerm The search term to match against the items.
 * @returns An array of filtered strings that include the search term.
 */
export function filterItems(items: string[], searchTerm: string): string[] {
  return items.filter((item: string) =>
    item.toUpperCase().includes(searchTerm.toUpperCase())
  );
}

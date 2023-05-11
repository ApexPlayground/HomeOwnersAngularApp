export function filterItems(items: string[], searchTerm: string): string[] {
  return items.filter((item: string) =>
    item.toUpperCase().includes(searchTerm.toUpperCase())
  );
}
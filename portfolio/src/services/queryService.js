/**
 * QUERY UTILITY FUNCTIONS
 * --------------------------------
 *
 * Utility Functions for making queries with portfolio data
 */

let uniqueTags = [];
export const getTags = (data, idx = 0) => {
  let pos = idx;
  let entry = data[pos];
  let tags = entry.tags;

  // map all tags
  tags.forEach((t) => {
    if (uniqueTags.indexOf(t) === -1) {
      uniqueTags.push(t);
    }
  });

  // base case
  if (pos === data.length - 1) {
    return uniqueTags;
  }

  return getTags(data, pos + 1);
};

let matchingEntries = [];
export const queryData = (data, query, idx = 0) => {
  let pos = idx;
  let entry = data[pos];
  let tags = entry.tags;

  // reset matching entries
  if (pos === 0) {
    matchingEntries = [];
  }

  tags.forEach((t) => {
    if (t === query) {
      matchingEntries.push(entry);
    }
  });

  // base case
  if (pos === data.length - 1) {
    return matchingEntries;
  }

  return queryData(data, query, pos + 1);
};

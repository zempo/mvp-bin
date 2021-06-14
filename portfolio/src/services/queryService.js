/**
 * QUERY UTILITY FUNCTIONS
 * --------------------------------
 *
 * Utility Functions for making queries with portfolio data
 */

import { capitalizeStr } from "./genService";

let uniqueTags = [];
export const getTags = (data, idx = 0) => {
  let pos = idx;
  let entry = data[pos];
  let tags = entry.tags;

  // reset matching entries
  if (pos === 0) {
    uniqueTags = [];
  }

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

export const getEmoji = (type) => {
  let output = type;
  switch (output) {
    case "article":
      output += " 📰";
      return capitalizeStr(output);
    case "snippet":
      output += " 🧩";
      return capitalizeStr(output);
    case "demo":
      output += " 🏆";
      return capitalizeStr(output);
    case "template":
      output += " 🧬";
      return capitalizeStr(output);
    case "3d art":
      output += " 💎";
      return capitalizeStr(output);
    default:
      return capitalizeStr(output);
  }
};

export const getGist = (url) => {
  let pos = url.indexOf(".com/");

  return url.slice(pos + 5);
};

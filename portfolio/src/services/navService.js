const pages = ["/", "/about", "/works", "/bytes", "/contact"];

export const getNextPg = (dir, location) => {
  let path = location;
  let start = 0;
  let end = pages.length - 1;
  let next;

  if (dir === "prev") {
    next = pages.indexOf(path) - 1;
  }
  if (dir === "fwd") {
    next = pages.indexOf(path) + 1;
  }
  if (dir === "fwd" && path === "/contact") {
    next = start;
  }
  if (dir === "prev" && path === "/") {
    next = end;
  }

  console.log(next);

  return pages[next];
};

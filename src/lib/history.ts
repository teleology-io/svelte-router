

export function listen(cb: (any) => void) {
  window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
      const result = target.apply(thisArg, argArray);
      cb({
        location: document.location || window.location,
        action: "push",
      });
      return result;
    },
  });

  const popListener = (ev) =>
    cb({
      location: document.location || window.location,
      action: "pop",
    });

  window.addEventListener("popstate", popListener);

  cb({
    location: document.location || window.location,
    action: "init",
  });
}
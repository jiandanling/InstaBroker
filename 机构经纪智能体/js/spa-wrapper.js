;(function (global) {
  function ensureWrappedInIndex(pageName) {
    try {
      if (typeof window === "undefined") return;
      if (window.top !== window.self) return;

      var path = window.location.pathname || "";
      if (!path) return;

      var rawSegment = path.split("/").pop() || "";
      var decodedSegment;
      try {
        decodedSegment = decodeURIComponent(rawSegment);
      } catch (e) {
        decodedSegment = rawSegment;
      }

      if (decodedSegment !== pageName) return;

      var lastSlash = path.lastIndexOf("/");
      var base = lastSlash >= 0 ? path.substring(0, lastSlash + 1) : "/";
      var target =
        base + "index.html?page=" + encodeURIComponent(decodedSegment);
      window.location.replace(target);
    } catch (e) {}
  }

  /** 子页被直接打开时：根据当前 pathname 自动重定向到 index.html?page=当前文件名 */
  function redirectIfStandalone() {
    try {
      if (typeof window === "undefined" || window.top !== window.self) return;
      var path = window.location.pathname || "";
      var raw = path.split("/").pop() || "";
      if (!raw || raw === "index.html") return;
      var decoded;
      try {
        decoded = decodeURIComponent(raw);
      } catch (e) {
        decoded = raw;
      }
      ensureWrappedInIndex(decoded);
    } catch (e) {}
  }

  global.__InstaBrokerSPA__ = global.__InstaBrokerSPA__ || {};
  global.__InstaBrokerSPA__.ensureWrappedInIndex = ensureWrappedInIndex;
  redirectIfStandalone();
})(window || this);


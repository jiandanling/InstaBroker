;(function (global) {
  function ensureWrappedInIndex(pageName) {
    try {
      if (typeof window === "undefined") return;
      if (window.top !== window.self) return;

      var path = window.location.pathname || "";
      if (!path) return;

      // 取当前文件名并做解码，处理中文文件名（例如 %E5%91%98... → 员工-...）
      var rawSegment = path.split("/").pop() || "";
      var decodedSegment;
      try {
        decodedSegment = decodeURIComponent(rawSegment);
      } catch (e) {
        decodedSegment = rawSegment;
      }

      if (decodedSegment !== pageName) return;

      // 取当前目录，保持在同一文件夹下（例如 /机构经纪智能体/）
      var lastSlash = path.lastIndexOf("/");
      var base = lastSlash >= 0 ? path.substring(0, lastSlash + 1) : "/";

      // 跳到同目录下的 index.html，由其根据 ?page=xxx 加载子页面
      var target =
        base + "index.html?page=" + encodeURIComponent(decodedSegment);
      window.location.replace(target);
    } catch (e) {
      // ignore
    }
  }

  global.__InstaBrokerSPA__ = global.__InstaBrokerSPA__ || {};
  global.__InstaBrokerSPA__.ensureWrappedInIndex = ensureWrappedInIndex;
})(window || this);


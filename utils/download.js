export function downloadText(content, filename) {
  if (!filename) filename = String(+new Date());
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  let url = URL.createObjectURL(blob);
  download(url, filename);
}

export function download(url, filename, newTab) {
  if (!filename) filename = url.slice(url.lastIndexOf("/") + 1);
  // 创建隐藏的可下载链接
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  if (newTab) {
    eleLink.target = "_blank";
  }
  // 字符内容转变成blob地址
  eleLink.href = url;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}

export function downloadCors(url, filename) {
  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin
    }),
    mode: "cors"
  })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      download(blobUrl, filename);
    })
    .catch(e => {
      console.error(e);
      download(url, filename, true);
    });
}

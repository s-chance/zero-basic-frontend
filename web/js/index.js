// 首页JavaScript文件

function $(selector) {
  return document.querySelector(selector);
}

function appendPic(item) {
  const { name, photographer, desc, picPath } = item || {};
  const html = `
  <li class="gallery-item" onclick="deleteFile('${name}','${photographer}','${desc}','${picPath}')">
      <img src="${picPath}" />
      <p class="name">${name}</p>
      <p class="photographer">${photographer}</p>
      <p class="desc">${desc}</p>
  </li>`;

  $("#pics").innerHTML += html;
}

async function fetchPics() {
  try {
    const response = await fetch("/pic/list", {
      method: "GET",
    });
    console.log("返回状态", response.status);
    const result = await response.json();

    result.data.forEach((item) => {
      appendPic(item); // 添加图片
    });
  } catch (e) {
    console.error("查询图片发生错误", e);
    alert("查询图片发生错误");
  }
}

fetchPics();

function deleteFile(name, photographer, desc, picPath) {
  window.sessionStorage.setItem("name", name);
  window.sessionStorage.setItem("photographer", photographer);
  window.sessionStorage.setItem("desc", desc);
  window.sessionStorage.setItem("picPath", picPath);

  location.href="submit.html";
}

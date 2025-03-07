// 表单页JavaScript文件

function $(selector) {
  return document.querySelector(selector);
}

function handlePreview() {
  const uploadEl = $("#upload");
  const previewEl = $("#preview");
  uploadEl.addEventListener("change", function () {
    console.log("选择文件", uploadEl.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      console.log("显示图片");
      previewEl.src = reader.result;
    });

    reader.readAsDataURL(uploadEl.files[0]);
  });

  const nameEl = $("#name");
  const photographerEl = $("#photographer");
  const descEl = $("#desc");

  nameEl.value = sessionStorage.getItem("name");
  photographerEl.value = sessionStorage.getItem("photographer");
  descEl.value = sessionStorage.getItem("desc");
  previewEl.src = sessionStorage.getItem("picPath");
}

handlePreview();

async function uploadFile() {
  // 1.处理输入数据
  const name = $("#name").value.trim();
  const photographer = $("#photographer").value.trim();
  const desc = $("#desc").value.trim();
  const fileObj = $("#upload").files[0];
  const currentPreview = $("#preview").src;
  console.log(currentPreview);
  if (currentPreview && currentPreview.length != 0 && !currentPreview.startsWith("data:image/")) {
    window.location.href = "index.html";
    return;
  }
  if (!fileObj) {
    alert("请选择图片");
    return;
  }

  if (!name) {
    alert("请输入图片名称");
    return;
  }

  if (!photographer) {
    alert("请输入摄影师");
    return;
  }

  if (!desc) {
    alert("请输入图片描述");
    return;
  }

  // 2.创建FormData对象
  const form = new FormData();
  form.append("file", fileObj);
  form.append("name", name);
  form.append("photographer", photographer);
  form.append("desc", desc);

  // 3.发送请求
  console.log("开始上传文件", { fileObj, name, photographer, desc });
  try {
    const response = await fetch("/pic/upload", {
      method: "POST",
      body: form,
    });
    console.log("状态码", response.status);

    const result = await response.json();
    if (result.success) {
      alert("上传成功！");
      window.location.href = "index.html";
      return;
    }
  } catch (e) {
    console.error("上传文件发生错误", e);
  }
  alert("上传失败！");
}

async function deleteFile() {
  const fileSrc = $("#preview").src;
  const filePath = fileSrc.substring(fileSrc.indexOf("data"));
  console.log("删除文件", filePath);

  try {
    const response = await fetch("/delete", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filePath),
    });
    console.log("状态码", response.status);

    const result = await response.json();
    if (result.success) {
      alert("删除成功！");
      window.location.href = "index.html";
      return;
    }
  } catch (e) {
    console.error("删除失败", e);
  }

  alert("删除失败！");
}

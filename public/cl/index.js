// 初期表示用にDBから値を取ってくる
const URL = "http://localhost:3000/api/v1";

const createStore = async (req) => {
  try {
    const res = await axios.post(URL + "/stores", req);
    return res.data.results;
  } catch (error) {
    throw new Error(error);
  }
};

const updateStore = async (req, id) => {
  try {
    const res = await axios.patch(URL + "/stores/" + id, req);
    return res.data.results;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteStore = async (id) => {
  try {
    const res = await axios.delete(URL + "/stores/" + id);
    return res.data.results;
  } catch (error) {
    throw new Error(error);
  }
};

const postBtn = document.getElementById("postBtn");
postBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const formEl = document.forms[0];
  const request = {
    name: formEl[0].value,
    address: formEl[1].value,
    tel: formEl[2].value,
  };
  try {
    const res = await createStore(request);
    alert(res + "件の登録に成功しました。");
  } catch (error) {
    alert("登録に失敗しました。");
  }
});

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const formEl = document.forms[1];
  const id = formEl[0].value;
  const request = {
    name: formEl[1].value,
    address: formEl[2].value,
    tel: formEl[3].value,
  };
  try {
    const res = await updateStore(request, id);
    alert(res.length + "件の更新に成功しました。");
  } catch (error) {
    alert("更新に失敗しました。");
  }
});

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const formEl = document.forms[2];
  const id = formEl[0].value;
  try {
    const res = await deleteStore(id);
    alert(res.length + "件の削除に成功しました。");
  } catch (error) {
    alert("削除に失敗しました。");
  }
});

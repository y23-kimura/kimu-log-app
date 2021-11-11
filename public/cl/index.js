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
    console.log(res);
    alert(res + "件の更新に成功しました。");
  } catch (error) {
    alert("更新に失敗しました。");
  }
});

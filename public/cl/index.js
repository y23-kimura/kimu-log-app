// 初期表示用にDBから値を取ってくる
const URL = "http://localhost:3000/api/v1";

const getStoreList = async () => {
  try {
    const res = await axios.get(URL + "/stores");
    return res.data.results;
  } catch (error) {
    throw new Error(error);
  }
};

const showStoreList = async () => {
  const res = await getStoreList();
  // validation
  if (!Array.isArray(res)) return;

  const mainEl = document.getElementById("main");
  res.forEach((value) => {
    const storeEl = document.createElement("div");
    storeEl.className = "store";
    const imageEl = document.createElement("img");
    // imageEl.src = "unknown";
    imageEl.className = "store_img";
    imageEl.alt = "this is store Image";
    const storeInfoEl = document.createElement("div");
    storeInfoEl.className = "store_info";
    const storeNameEl = document.createElement("h3");
    storeNameEl.className = "store_name";
    storeNameEl.innerText = value.name;
    const storeAddressEl = document.createElement("p");
    storeAddressEl.className = "store_address";
    storeAddressEl.innerText = value.address;
    const storeTelEl = document.createElement("p");
    storeTelEl.className = "store_tel";
    storeTelEl.innerText = value.tel;
    storeEl.appendChild(imageEl);
    storeEl.appendChild(storeInfoEl);
    storeInfoEl.appendChild(storeNameEl);
    storeInfoEl.appendChild(storeTelEl);
    storeInfoEl.appendChild(storeAddressEl);
    mainEl.appendChild(storeEl);
  });
};

showStoreList();

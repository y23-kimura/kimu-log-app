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
    const storeIdEl = document.createElement("td");
    storeIdEl.className = "store_id";
    storeIdEl.innerText = value.id;
    const storeNameEl = document.createElement("td");
    storeNameEl.className = "store_name";
    storeNameEl.innerText = value.name;
    const storeAddressEl = document.createElement("td");
    storeAddressEl.className = "store_address";
    storeAddressEl.innerText = value.address;
    const storeTelEl = document.createElement("td");
    storeTelEl.className = "store_tel";
    storeTelEl.innerText = value.tel;

    const tr = document.createElement("tr");
    tr.className = "store_tr";
    tr.appendChild(storeIdEl);
    tr.appendChild(storeNameEl);
    tr.appendChild(storeAddressEl);
    tr.appendChild(storeTelEl);
    mainEl.appendChild(document.createElement("tbody").appendChild(tr));
  });
};

// setInterval(showStoreList, 5000);
showStoreList();

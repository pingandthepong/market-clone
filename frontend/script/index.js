const calcTime = (timestamp) => {
  // 한국 기준(UTC+9) => 9시간 빼주기
  const currentTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const timeDiff = new Date(currentTime - timestamp);
  const hour = timeDiff.getHours();
  const minute = timeDiff.getMinutes();
  const seconds = timeDiff.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (seconds > 0) return `${seconds}초 전`;
  else return `방금 전`;
};

const renderData = (data) => {
  data.reverse().forEach(async (obj) => {
    const itemList = document.createElement("div");
    itemList.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";
    const img = document.createElement("img");
    // BLOB hex => image type으로 변경
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const info = document.createElement("div");
    info.className = "item-list__info";

    const infoTitle = document.createElement("h3");
    infoTitle.className = "item-list__info-title";
    infoTitle.textContent = obj.title;

    const infoMeta = document.createElement("div");
    infoMeta.className = "item-list__info-meta";
    const metaImg = document.createElement("img");
    metaImg.src = "./assets/map.svg";
    const infoMetaText = document.createElement("p");
    infoMetaText.className = "item-list__info-meta__text";
    infoMetaText.textContent = `${obj.place} · ${calcTime(obj.insertAt)}`;

    const infoPrice = document.createElement("p");
    infoPrice.className = "item-list__info-price";
    infoPrice.textContent = `${obj.price}원`;

    const more = document.createElement("button");
    more.className = "item-list__more";
    const moreIcon = document.createElement("img");
    moreIcon.src = "./assets/ellipsis-vertical.svg";
    moreIcon.alt = "more info";

    const favorite = document.createElement("button");
    favorite.className = "item-list__favorite";
    favorite.textContent = 0;
    const favoriteIcon = document.createElement("img");
    favoriteIcon.src = "./assets/favorite.svg";
    favoriteIcon.alt = "즐겨찾기";

    const mainContents = document.querySelector(
      ".page-index  section.contents"
    );
    mainContents.append(itemList);

    itemList.append(imgDiv);
    itemList.append(info);
    itemList.append(more);
    itemList.append(favorite);
    imgDiv.append(img);
    info.append(infoTitle);
    info.append(infoMeta);
    info.append(infoPrice);
    infoMeta.append(metaImg);
    infoMeta.append(infoMetaText);
    more.append(moreIcon);
    favorite.prepend(favoriteIcon);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();

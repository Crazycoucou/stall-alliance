const feedStorageKey = "stallAllianceProductFeed";

const baseFeed = [
  {
    id: "seed-1",
    city: "杭州",
    type: "柠檬茶摊主",
    category: "柠檬茶",
    profit: 487,
    units: 126,
    summary: "最大的教训：冰块备少了，晚高峰断货 20 分钟。下次冰块按天气预报温度加 30% 安全量。",
    tags: ["柠檬茶", "夜市", "备货"],
    likes: 128,
    comments: 24
  },
  {
    id: "seed-2",
    city: "成都",
    type: "烤肠摊主",
    category: "烤肠",
    profit: 356,
    units: 214,
    summary: "学校门口 17:20 后转化最高，低价单品负责排队，高毛利芝士款负责利润。",
    tags: ["校园", "烤肠", "套餐"],
    likes: 94,
    comments: 18
  },
  {
    id: "seed-3",
    city: "上海",
    type: "文创市集摊主",
    category: "文创",
    profit: 612,
    units: 43,
    summary: "客人不缺贴纸，缺的是送礼理由。把产品按生日、毕业、通勤分类后，成交明显更快。",
    tags: ["文创", "市集", "陈列"],
    likes: 176,
    comments: 31
  },
  {
    id: "seed-4",
    city: "广州",
    type: "移动咖啡摊主",
    category: "咖啡",
    profit: 529,
    units: 78,
    summary: "写字楼下午后 15:00 比早高峰更稳，大家愿意为第二杯咖啡付更高客单价。",
    tags: ["咖啡", "写字楼", "时段"],
    likes: 143,
    comments: 20
  },
  {
    id: "seed-5",
    city: "武汉",
    type: "饰品摊主",
    category: "饰品",
    profit: 298,
    units: 67,
    summary: "灯光比位置更重要。加了冷白补光后，银饰质感明显，停留时间变长。",
    tags: ["饰品", "夜市", "灯光"],
    likes: 82,
    comments: 11
  },
  {
    id: "seed-6",
    city: "厦门",
    type: "旧物摊主",
    category: "市集",
    profit: 421,
    units: 35,
    summary: "别只写价格，给每件货留一句来源故事。愿意听故事的人，才是最像买家的人。",
    tags: ["市集", "二手", "标签"],
    likes: 101,
    comments: 16
  }
];

const categories = [
  { name: "柠檬茶", count: 128, note: "高频问题：冰块、糖浆、出杯速度" },
  { name: "咖啡", count: 96, note: "高频问题：点位、设备、电源" },
  { name: "烤肠", count: 84, note: "高频问题：学校、排队、套餐" },
  { name: "文创", count: 77, note: "高频问题：陈列、定价、送礼场景" },
  { name: "饰品", count: 69, note: "高频问题：灯光、盗损、试戴" },
  { name: "夜市", count: 142, note: "高频问题：竞争、合规、收摊" },
  { name: "校园", count: 58, note: "高频问题：时段、低客单、爆品" },
  { name: "市集", count: 73, note: "高频问题：摊位费、选品、复购" }
];

const mapSpots = [
  {
    name: "杭州湖滨银泰侧街",
    city: "杭州",
    traffic: "高",
    policy: "中",
    time: "18:30-22:00",
    index: 86,
    note: "饮品和小吃转化高，竞争也密，适合用强视觉单品试摊。"
  },
  {
    name: "成都玉林社区口",
    city: "成都",
    traffic: "中高",
    policy: "低",
    time: "16:30-20:30",
    index: 79,
    note: "社区复购强，适合鲜花、二手、手作和轻食，靠口碑慢慢积累。"
  },
  {
    name: "上海大学路周末市集",
    city: "上海",
    traffic: "高",
    policy: "低",
    time: "周末 13:00-21:00",
    index: 83,
    note: "文创和饰品表现好，但摊位费偏高，要算清楚客单价。"
  },
  {
    name: "广州珠江新城写字楼下",
    city: "广州",
    traffic: "中",
    policy: "中",
    time: "08:00-10:00 / 14:30-17:00",
    index: 74,
    note: "咖啡和轻食适配，早高峰快，午后复购更稳定。"
  },
  {
    name: "武汉江汉路支路",
    city: "武汉",
    traffic: "高",
    policy: "高",
    time: "19:00-23:00",
    index: 61,
    note: "人流强但管理严格，建议只做低库存快闪，不适合重设备。"
  },
  {
    name: "厦门沙坡尾入口",
    city: "厦门",
    traffic: "中高",
    policy: "中",
    time: "15:00-21:30",
    index: 78,
    note: "游客多，适合有拍照属性的饮品、花束和纪念品。"
  }
];

const logs = [
  {
    title: "杭州｜柠檬茶",
    weather: "晴，31℃",
    units: 126,
    profit: 487,
    problem: "冰块断货，晚高峰损失 20 分钟。",
    lesson: "温度超过 30℃，冰块按预计销量 1.3 倍准备。"
  },
  {
    title: "成都｜烤肠",
    weather: "阴，24℃",
    units: 214,
    profit: 356,
    problem: "低价款卖太快，高毛利款介绍不够。",
    lesson: "招牌上把芝士款放第一位，低价款只负责引流。"
  },
  {
    title: "上海｜文创",
    weather: "小雨，22℃",
    units: 43,
    profit: 612,
    problem: "雨天停留短，客人不愿慢慢挑。",
    lesson: "把礼物套装前置，减少选择时间。"
  }
];

const feedGrid = document.querySelector("#feedGrid");
const feedSearch = document.querySelector("#feedSearch");
const feedFilter = document.querySelector("#feedFilter");
const categoryGrid = document.querySelector("#categoryGrid");
const profitForm = document.querySelector("#profitForm");
const mapGrid = document.querySelector("#mapGrid");
const logList = document.querySelector("#logList");
const publishForm = document.querySelector("#publishForm");
const postImage = document.querySelector("#postImage");
const imagePreview = document.querySelector("#imagePreview");
const toast = document.querySelector("#toast");

let feed = loadFeed();

function loadFeed() {
  const saved = JSON.parse(localStorage.getItem(feedStorageKey) || "[]");
  return [...saved, ...baseFeed];
}

function saveCustomFeed() {
  const custom = feed.filter((item) => item.id.startsWith("custom-"));
  localStorage.setItem(feedStorageKey, JSON.stringify(custom));
}

function renderFeed() {
  const query = feedSearch.value.trim().toLowerCase();
  const filter = feedFilter.value;
  const visible = feed.filter((item) => {
    const matchesFilter = filter === "全部" || item.category === filter || item.tags.includes(filter);
    const text = `${item.city} ${item.type} ${item.category} ${item.summary} ${item.tags.join(" ")}`.toLowerCase();
    return matchesFilter && text.includes(query);
  });

  feedGrid.innerHTML = visible.map(createFeedCard).join("");
  document.querySelector("#todayPosts").textContent = Math.max(24, visible.length + 18);
  document.querySelector("#topCity").textContent = findTopValue(visible, "city") || "杭州";
  document.querySelector("#topCategory").textContent = findTopValue(visible, "category") || "柠檬茶";
}

function createFeedCard(item) {
  return `
    <article class="feed-card">
      <div>
        <div class="feed-meta">
          <span>${escapeHtml(item.city)}｜${escapeHtml(item.type)}</span>
          <span>${escapeHtml(item.category)}</span>
        </div>
        <div class="profit-row">
          <span>今日利润 +${formatMoney(item.profit)}</span>
          <span>销量 ${item.units} 单</span>
        </div>
        <h3>${escapeHtml(item.summary.split("。")[0])}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </div>
      <div>
        <div class="tags">${item.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="feed-actions">
          <span>${item.likes} 赞</span>
          <span>${item.comments} 评论</span>
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  categoryGrid.innerHTML = categories
    .map(
      (item) => `
        <button class="category-card" type="button" data-category="${item.name}">
          <strong>${item.name}</strong>
          <p>${item.count} 条经验 · ${item.note}</p>
        </button>
      `
    )
    .join("");
}

function renderMap() {
  mapGrid.innerHTML = mapSpots
    .map(
      (spot) => `
        <article class="map-card">
          <div class="map-card-head">
            <div>
              <h3>${spot.name}</h3>
              <p>${spot.city} · 推荐时段 ${spot.time}</p>
            </div>
            <span class="index-pill">${spot.index}</span>
          </div>
          <div class="map-facts">
            <span><strong>人流</strong>${spot.traffic}</span>
            <span><strong>管理</strong>${spot.policy}</span>
          </div>
          <p>${spot.note}</p>
        </article>
      `
    )
    .join("");
}

function renderLogs() {
  logList.innerHTML = logs
    .map(
      (log) => `
        <article class="log-card">
          <h3>${log.title}</h3>
          <div class="log-stats">
            <span><strong>${log.weather}</strong>天气</span>
            <span><strong>${log.units} 单</strong>销量</span>
            <span><strong>${formatMoney(log.profit)}</strong>利润</span>
          </div>
          <p><strong>今日问题：</strong>${log.problem}</p>
          <p><strong>今日心得：</strong>${log.lesson}</p>
        </article>
      `
    )
    .join("");
}

function calculateProfit() {
  const price = readNumber("priceInput");
  const raw = readNumber("rawCostInput");
  const ice = readNumber("iceCostInput");
  const cup = readNumber("cupCostInput");
  const rent = readNumber("rentInput");
  const units = Math.max(1, readNumber("unitsInput", 1));
  const investment = readNumber("investmentInput");

  const revenue = price * units;
  const variableCost = (raw + ice + cup) * units;
  const dailyProfit = revenue - variableCost - rent;
  const monthlyProfit = dailyProfit * 30;
  const margin = revenue > 0 ? dailyProfit / revenue : 0;
  const paybackDays = dailyProfit > 0 ? Math.ceil(investment / dailyProfit) : null;
  const maxCost = Math.max(raw, ice, cup, rent / units, 1);

  document.querySelector("#dailyProfitValue").textContent = formatMoney(dailyProfit);
  document.querySelector("#monthlyProfitValue").textContent = formatMoney(monthlyProfit);
  document.querySelector("#paybackValue").textContent = paybackDays ? `${paybackDays} 天` : "未回本";
  document.querySelector("#marginValue").textContent = `${Math.round(margin * 100)}%`;

  setBar("rawBar", raw, maxCost);
  setBar("iceBar", ice, maxCost);
  setBar("cupBar", cup, maxCost);
  setBar("rentBar", rent / units, maxCost);

  let advice = "利润结构健康。接下来重点记录每个时段的销量，找到真正赚钱的 2 小时。";
  if (dailyProfit <= 0) {
    advice = "当前模型亏损。优先提高售价、减少固定摊位费，或降低单杯成本。";
  } else if (margin < 0.25) {
    advice = "利润率偏低。建议设计加料、第二杯优惠或套餐，提高客单价。";
  } else if (paybackDays && paybackDays > 30) {
    advice = "能盈利，但回本偏慢。先用轻设备和低库存试摊，别急着扩大投入。";
  }

  document.querySelector("#profitAdvice").textContent = advice;
}

function setBar(id, value, max) {
  const width = Math.max(4, Math.round((value / max) * 100));
  document.querySelector(`#${id}`).style.setProperty("--bar-width", `${width}%`);
}

function readNumber(id, fallback = 0) {
  const value = Number(document.querySelector(`#${id}`)?.value);
  return Number.isFinite(value) ? value : fallback;
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(value);
}

function findTopValue(items, key) {
  const counts = items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function updateLiveNumbers() {
  const base = 1284 + Math.floor(Math.random() * 40);
  document.querySelector("#onlineVendors").textContent = base.toLocaleString("zh-CN");
  document.querySelector("#cityIndex").textContent = 78 + Math.floor(Math.random() * 9);
  document.querySelector("#liveClock").textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

feedSearch.addEventListener("input", renderFeed);
feedFilter.addEventListener("change", renderFeed);
profitForm.addEventListener("input", calculateProfit);

categoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  feedFilter.value = button.dataset.category;
  renderFeed();
  document.querySelector("#feed").scrollIntoView({ behavior: "smooth" });
});

postImage.addEventListener("change", () => {
  const file = postImage.files?.[0];
  if (!file) {
    imagePreview.classList.remove("has-image");
    imagePreview.innerHTML = "";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imagePreview.innerHTML = `<img src="${reader.result}" alt="上传图片预览" />`;
    imagePreview.classList.add("has-image");
  });
  reader.readAsDataURL(file);
});

publishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tags = document
    .querySelector("#postTags")
    .value.split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  const item = {
    id: `custom-${Date.now()}`,
    city: document.querySelector("#postCity").value.trim(),
    type: document.querySelector("#postType").value.trim(),
    category: tags[0] || "经验",
    profit: readNumber("postProfit"),
    units: Math.max(1, readNumber("postUnits", 1)),
    summary: document.querySelector("#postSummary").value.trim(),
    tags: tags.length ? tags : ["经验"],
    likes: 0,
    comments: 0
  };

  feed = [item, ...feed];
  saveCustomFeed();
  renderFeed();
  publishForm.reset();
  imagePreview.classList.remove("has-image");
  imagePreview.innerHTML = "";
  showToast("已发布到经验流，本地保存成功");
  document.querySelector("#feed").scrollIntoView({ behavior: "smooth" });
});

renderCategories();
renderFeed();
renderMap();
renderLogs();
calculateProfit();
updateLiveNumbers();
window.setInterval(updateLiveNumbers, 15000);

const seedStories = [
  {
    id: "seed-1",
    category: "小吃",
    author: "老陈",
    location: "广州海珠",
    title: "炸串摊雨天别急着收，换三样东西还能稳住客流",
    body:
      "雨天人少，但热汤、纸巾和可站着吃的套餐会变重要。我把单串改成小份拼盘，再加一杯热豆浆，客单价反而更稳。",
    tags: ["雨天", "套餐", "客单价"],
    saves: 42,
    heat: 96,
    createdAt: "2026-05-20T19:30:00"
  },
  {
    id: "seed-2",
    category: "手作",
    author: "米粒",
    location: "杭州湖滨",
    title: "手作摊不要只摆成品，半成品反而更能留人",
    body:
      "我把香薰蜡烛的色块、模具和试香纸摆出来，客人会主动问过程。讲清制作时间和保养方法，比单纯喊价更容易成交。",
    tags: ["陈列", "沟通", "手作"],
    saves: 35,
    heat: 88,
    createdAt: "2026-05-22T14:20:00"
  },
  {
    id: "seed-3",
    category: "鲜花",
    author: "枝枝",
    location: "上海武康路",
    title: "花车晚高峰只推三种价位，选择越少越好卖",
    body:
      "下班路过的人决策时间很短。我准备了 19、39、59 三档小花束，每档固定包装，现场只做微调，损耗和排队都少了。",
    tags: ["定价", "损耗", "晚高峰"],
    saves: 51,
    heat: 99,
    createdAt: "2026-05-24T18:10:00"
  },
  {
    id: "seed-4",
    category: "修理",
    author: "强叔",
    location: "武汉江汉",
    title: "修鞋修伞摊最值钱的是信任，不是工具箱大小",
    body:
      "我把常见价格写清楚，不能修的当场说原因。小修免费检查一次，很多回头客就是从这一步来的。",
    tags: ["信任", "明码标价", "回头客"],
    saves: 28,
    heat: 75,
    createdAt: "2026-05-18T09:00:00"
  },
  {
    id: "seed-5",
    category: "二手",
    author: "小唐",
    location: "成都玉林",
    title: "二手摊标签别写太满，留一句故事更好聊",
    body:
      "衣服只写尺码、成色、价格和一句来源。客人愿意问，摊主也更容易判断对方是不是目标买家。",
    tags: ["标签", "选品", "聊天"],
    saves: 24,
    heat: 68,
    createdAt: "2026-05-21T16:40:00"
  },
  {
    id: "seed-6",
    category: "饮品",
    author: "阿青",
    location: "厦门沙坡尾",
    title: "移动咖啡摊的第一杯不要快，要稳",
    body:
      "第一杯常常决定围观的人敢不敢买。我宁愿慢十秒，也会把香气、杯套和出杯动作做好，让后面的人看见稳定感。",
    tags: ["出杯", "围观", "品质"],
    saves: 47,
    heat: 91,
    createdAt: "2026-05-25T08:15:00"
  }
];

const storageKey = "stallAllianceStories";
const savedKey = "stallAllianceSavedIds";

const storyGrid = document.querySelector("#storyGrid");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const chips = [...document.querySelectorAll(".chip")];
const postForm = document.querySelector("#postForm");
const toast = document.querySelector("#toast");
const storyDialog = document.querySelector("#storyDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");
const costForm = document.querySelector("#costForm");
const locationForm = document.querySelector("#locationForm");

let currentCategory = "全部";
let stories = loadStories();
let savedIds = new Set(JSON.parse(localStorage.getItem(savedKey) || "[]"));

function loadStories() {
  const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
  return [...stored, ...seedStories];
}

function persistCustomStories() {
  const customStories = stories.filter((story) => !story.id.startsWith("seed-"));
  localStorage.setItem(storageKey, JSON.stringify(customStories));
}

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();
  const sortMode = sortSelect.value;

  let visible = stories.filter((story) => {
    const categoryMatch = currentCategory === "全部" || story.category === currentCategory;
    const haystack = `${story.title} ${story.body} ${story.author} ${story.location} ${story.tags.join(" ")}`.toLowerCase();
    return categoryMatch && haystack.includes(query);
  });

  visible = visible.sort((a, b) => {
    if (sortMode === "new") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortMode === "saves") return b.saves - a.saves;
    return b.heat - a.heat;
  });

  storyGrid.innerHTML = visible.map(createStoryCard).join("");
  resultCount.textContent = `${visible.length} 条匹配经验`;
  updateLedger(visible);
}

function createStoryCard(story) {
  const isSaved = savedIds.has(story.id);
  return `
    <article class="story-card">
      <div>
        <span class="category-pill">${story.category}</span>
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(story.body)}</p>
      </div>
      <div>
        <div class="tagline">
          ${story.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="card-footer">
          <div class="meta">${escapeHtml(story.author)} · ${escapeHtml(story.location)}<br>${formatDate(story.createdAt)}</div>
          <div class="card-actions">
            <button class="small-button" type="button" data-action="open" data-id="${story.id}" aria-label="查看详情">↗</button>
            <button class="small-button" type="button" data-action="save" data-id="${story.id}" aria-label="收藏">${isSaved ? "★" : "☆"}</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function updateLedger(visibleStories) {
  document.querySelector("#totalPosts").textContent = stories.length;
  document.querySelector("#totalSaves").textContent = stories.reduce((sum, story) => sum + story.saves, 0);
  document.querySelector("#activeCategory").textContent = currentCategory;

  const tagCounts = visibleStories.flatMap((story) => story.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "备货";
  document.querySelector("#topicOfDay").textContent = topTag;
}

function showStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;

  dialogContent.innerHTML = `
    <div class="dialog-body">
      <span class="category-pill">${story.category}</span>
      <h3>${escapeHtml(story.title)}</h3>
      <p>${escapeHtml(story.body)}</p>
      <div class="tagline">${story.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
      <p class="meta">${escapeHtml(story.author)} · ${escapeHtml(story.location)} · ${formatDate(story.createdAt)}</p>
    </div>
  `;
  storyDialog.showModal();
}

function toggleSave(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;

  if (savedIds.has(id)) {
    savedIds.delete(id);
    story.saves = Math.max(0, story.saves - 1);
    showToast("已取消收藏");
  } else {
    savedIds.add(id);
    story.saves += 1;
    showToast("已收藏这条经验");
  }

  localStorage.setItem(savedKey, JSON.stringify([...savedIds]));
  persistCustomStories();
  renderStories();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric" }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readNumber(id, fallback = 0) {
  const value = Number(document.querySelector(`#${id}`)?.value);
  return Number.isFinite(value) ? value : fallback;
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: value >= 100 ? 0 : 1
  }).format(value);
}

function calculateCosts() {
  const materialCost = readNumber("materialCost");
  const packageCost = readNumber("packageCost");
  const stallFee = readNumber("stallFee");
  const transportCost = readNumber("transportCost");
  const laborCost = readNumber("laborCost");
  const otherCost = readNumber("otherCost");
  const dailyUnits = Math.max(1, readNumber("dailyUnits", 1));
  const salePrice = readNumber("salePrice");
  const setupCost = readNumber("setupCost");
  const targetMargin = Math.min(80, Math.max(1, readNumber("targetMargin", 35))) / 100;

  const unitVariableCost = materialCost + packageCost;
  const dailyFixedCost = stallFee + transportCost + laborCost + otherCost;
  const dailyRevenue = dailyUnits * salePrice;
  const dailyCost = dailyUnits * unitVariableCost + dailyFixedCost;
  const dailyProfit = dailyRevenue - dailyCost;
  const margin = dailyRevenue > 0 ? dailyProfit / dailyRevenue : 0;
  const paybackDays = dailyProfit > 0 ? Math.ceil(setupCost / dailyProfit) : null;
  const suggestedPrice = (unitVariableCost + dailyFixedCost / dailyUnits) / (1 - targetMargin);

  document.querySelector("#dailyRevenue").textContent = formatMoney(dailyRevenue);
  document.querySelector("#dailyProfit").textContent = formatMoney(dailyProfit);
  document.querySelector("#profitMargin").textContent = `${Math.round(margin * 100)}%`;
  document.querySelector("#paybackDays").textContent = paybackDays ? `${paybackDays} 天` : "未回本";
  document.querySelector("#suggestedPrice").textContent = formatMoney(suggestedPrice);

  let advice = "当前模型按日销量摊薄固定成本，建议结合实际损耗和淡旺季再留 5%-10% 安全空间。";
  if (dailyProfit <= 0) {
    advice = "当前售价或销量无法覆盖每日成本。优先检查摊位费、人工安排和单份毛利，必要时缩小 SKU 或提高客单价。";
  } else if (salePrice < suggestedPrice) {
    advice = "当前平均售价低于目标利润率所需售价。可以通过套餐、加料、升级包装或提高核心单品价格来补齐利润。";
  } else if (margin >= targetMargin) {
    advice = "当前售价已经达到目标利润率。重点关注稳定销量、控制损耗和复购，而不是继续盲目降价。";
  }

  document.querySelector("#costAdvice").textContent = advice;
}

function calculateLocation() {
  const traffic = readNumber("trafficScore", 3);
  const match = readNumber("matchScore", 3);
  const visibility = readNumber("visibilityScore", 3);
  const dwell = readNumber("dwellScore", 3);
  const competition = readNumber("competitionScore", 3);
  const rent = readNumber("rentScore", 3);
  const policy = readNumber("policyScore", 3);
  const shelter = readNumber("shelterScore", 3);
  const stallType = document.querySelector("#stallType").value;
  const timeSlot = document.querySelector("#timeSlot").value;

  const typeBonus = {
    food: { evening: 7, lunch: 5, morning: 3, weekend: 4 },
    craft: { weekend: 7, evening: 4, lunch: 1, morning: -2 },
    flower: { evening: 5, weekend: 5, morning: 2, lunch: 1 },
    repair: { morning: 5, lunch: 4, weekend: 2, evening: 0 },
    secondhand: { weekend: 8, evening: 3, lunch: 0, morning: -2 }
  };

  const normalized =
    traffic * 4.6 +
    match * 4.1 +
    visibility * 2.8 +
    dwell * 2.6 +
    shelter * 1.4 +
    (6 - competition) * 2.1 +
    (6 - rent) * 1.8 +
    (6 - policy) * 1.6;

  const index = Math.max(0, Math.min(100, Math.round(normalized + (typeBonus[stallType]?.[timeSlot] || 0))));
  const level = index >= 82 ? "强烈推荐" : index >= 68 ? "值得试摊" : index >= 52 ? "谨慎观察" : "暂不推荐";

  const risks = [];
  if (competition >= 4) risks.push("竞争密度偏高");
  if (rent >= 4) risks.push("固定成本偏高");
  if (policy >= 4) risks.push("合规风险偏高");
  if (traffic <= 2) risks.push("自然人流不足");
  if (match <= 2) risks.push("客群匹配偏弱");

  const advice =
    risks.length > 0
      ? `${level}。主要风险是${risks.join("、")}，建议先用 2-3 次低库存试摊验证转化率。`
      : `${level}。这个点位的基础条件较均衡，建议记录每小时成交数和客单价，连续三次复盘后再决定长期占位。`;

  document.querySelector("#locationIndex").textContent = index;
  document.querySelector("#locationLevel").textContent = level;
  document.querySelector("#locationAdvice").textContent = advice;
  document.querySelector(".score-ring").style.setProperty("--score-angle", `${index * 3.6}deg`);

  updateSliderLabels();
  renderHeatMap(index, { traffic, match, dwell, competition, rent, policy, shelter });
}

function updateSliderLabels() {
  const labels = [
    ["trafficScore", "trafficValue"],
    ["matchScore", "matchValue"],
    ["visibilityScore", "visibilityValue"],
    ["dwellScore", "dwellValue"],
    ["competitionScore", "competitionValue"],
    ["rentScore", "rentValue"],
    ["policyScore", "policyValue"],
    ["shelterScore", "shelterValue"]
  ];

  labels.forEach(([inputId, outputId]) => {
    document.querySelector(`#${outputId}`).textContent = document.querySelector(`#${inputId}`).value;
  });
}

function renderHeatMap(baseIndex, factors) {
  const cells = [
    ["入口外侧", 7 + factors.visibility],
    ["主通道中段", 5 + factors.traffic],
    ["转角位", 3 + factors.visibility + factors.dwell],
    ["排队旁", 6 + factors.dwell],
    ["地铁口", 4 + factors.traffic - factors.policy],
    ["学校边", 2 + factors.match - factors.policy],
    ["写字楼下", 3 + factors.match - factors.rent],
    ["社区门口", 2 + factors.dwell],
    ["夜市核心", 6 + factors.traffic - factors.competition],
    ["停车边", -1 + factors.shelter],
    ["竞品旁", -3 - factors.competition + factors.traffic],
    ["背街位", -8 + factors.rent]
  ];

  document.querySelector("#heatMap").innerHTML = cells
    .map(([label, delta]) => {
      const score = Math.max(18, Math.min(98, Math.round(baseIndex + delta)));
      const hue = Math.round(8 + score * 1.15);
      const color = `hsl(${hue}, 58%, ${score > 72 ? 34 : 42}%)`;
      return `
        <div class="heat-cell" style="background:${color}">
          <strong>${label}</strong>
          <span>${score}</span>
        </div>
      `;
    })
    .join("");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    currentCategory = chip.dataset.category;
    chips.forEach((item) => item.classList.toggle("active", item === chip));
    renderStories();
  });
});

storyGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  if (button.dataset.action === "open") showStory(button.dataset.id);
  if (button.dataset.action === "save") toggleSave(button.dataset.id);
});

document.querySelectorAll(".prompt-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#titleInput").value = button.dataset.prompt;
    document.querySelector("#bodyInput").focus();
  });
});

postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tags = document
    .querySelector("#tagsInput")
    .value.split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  const story = {
    id: `custom-${Date.now()}`,
    category: document.querySelector("#categoryInput").value,
    author: document.querySelector("#authorInput").value.trim(),
    location: document.querySelector("#locationInput").value.trim(),
    title: document.querySelector("#titleInput").value.trim(),
    body: document.querySelector("#bodyInput").value.trim(),
    tags: tags.length ? tags : ["心得"],
    saves: 0,
    heat: 60,
    createdAt: new Date().toISOString()
  };

  stories = [story, ...stories];
  persistCustomStories();
  postForm.reset();
  currentCategory = "全部";
  chips.forEach((item) => item.classList.toggle("active", item.dataset.category === "全部"));
  sortSelect.value = "new";
  renderStories();
  showToast("已发布到摊主联盟");
  document.querySelector("#stories").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", renderStories);
sortSelect.addEventListener("change", renderStories);
closeDialog.addEventListener("click", () => storyDialog.close());
costForm.addEventListener("input", calculateCosts);
locationForm.addEventListener("input", calculateLocation);
locationForm.addEventListener("change", calculateLocation);

renderStories();
calculateCosts();
calculateLocation();

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

renderStories();

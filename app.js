// ==========================
// ⭐ 主数据配置（可自由扩展/修改）
// ==========================
const profileData = {
  username: "盒子AWA",
  tagline: "FRONT-END DEV | CYBER UI | SYSTEM ONLINE",

  bio: `
你好，我是一名玩家。

我专注于构建高质量 UI、组件化架构、以及玩玩游戏。
喜欢研究交互动画、HUD UI、游戏化网页设计。

技术栈：
- HTML / CSS / JavaScript
- TypeScript
- UI 动效 / WebGL（学习中）
  `,

  events: [
    { year: "2023", desc: "开始学习 Web 开发，建立第一个个人主页。" },
    { year: "2025", desc: "深入 Vue / React，搭建组件库与多个项目。" },
    { year: "2026", desc: "研究赛博朋克 HUD UI 风格，打造作品集主页。" }
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/" },
    { name: "Bilibili", url: "https://space.bilibili.com/630893908?spm_id_from=333.1007.0.0" },
    { name: "QQ", url: "https://qm.qq.com/cgi-bin/qm/qr?k=ySnWrFhMPBA9Vgy9lnuhjQFcRxrP8Ff1" }
  ],

  projects: [
    {
      id: "PRJ-0001",
      name: "hallo word UI（已停用）",
      desc: "我的第一个网站",
      tech: ["HTML", "CSS", "JavaScript"],
      status: "ACTIVE",
      github: "",
      demo: "#"
    },
    {
      id: "PRJ-0002",
      name: "个人UI测试（已停用）",
      desc: "个人 UI 组件实验室，包含按钮、卡片、HUD 布局组件。",
      tech: ["TypeScript", "React"],
      status: "DEVELOPING",
      github: "https://github.com/",
      demo: "#"
    }
  ],

  achievements: [
    {
      code: "ACH-0001",
      title: "HELLO WORLD",
      desc: "第一次写下 Hello World。",
      level: "COMMON",
      year: "2023"
    },
    {
      code: "ACH-0002",
      title: "FRAMEWORK RUNNER",
      desc: "掌握 Vue / React 开发模式。",
      level: "RARE",
      year: "2025"
    },
    {
      code: "ACH-0003",
      title: "NIGHT CITY DESIGNER",
      desc: "完成赛博朋克 HUD 风格作品集主页。（谢谢你，gpt）",
      level: "EPIC",
      year: "2026"
    }
   ],

  logs: [
    {
      id: "LOG-0001",
      date: "2026-05-18",
      title: "搭建 Cyber UI 主页系统",
      content:
        "今天完成了主页框架，加入了 boot loading、glitch title、HUD panel。下一步准备加 Projects / Achievements。"
    },
    {
      id: "LOG-0002",
      date: "2026-05-18",
      title: "研究 HUD 风格布局",
      content:
        "总结 HUD UI 的特点：扫描线、角标、霓虹色、卡片分层。后续可以加随机推荐和动态名言。"
    },
    {
      id: "LOG-0003",
      date: "2026-05-18",
      title: "增加博客推荐与名言功能",
      content:
        "在主页展示博客推荐，同时随机显示中英文名言，并包含作者。功能组建完成。"
    }
  ]
};

// ==========================
// ⭐ 工具函数
// ==========================
function $(id) {
  return document.getElementById(id);
}

function safeSetText(id, text) {
  const el = $(id);
  if (el) el.innerText = text;
}

function safeSetHTML(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}

function createItem(year, desc) {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <div class="year">${year}</div>
    <div class="desc">${desc}</div>
  `;
  return div;
}

// ==========================
// ⭐ 渲染顶部栏信息
// ==========================
function renderTopbar() {
  const usernameEl = $("username");
  if (usernameEl) {
    usernameEl.innerText = profileData.username;
    usernameEl.setAttribute("data-text", profileData.username);
  }

  safeSetText("tagline", profileData.tagline);

  const yearEl = $("year");
  if (yearEl) yearEl.innerText = new Date().getFullYear();
}

// ==========================
// ⭐ 渲染个人简介
// ==========================
function renderBio() {
  safeSetText("bio", profileData.bio.trim());
}

// ==========================
// ⭐ 渲染历史事迹
// ==========================
function renderHistory() {
  const list = $("historyList");
  if (!list) return;

  list.innerHTML = "";
  profileData.events.forEach((e) => {
    list.appendChild(createItem(e.year, e.desc));
  });
}

// ==========================
// ⭐ 渲染社交媒体
// ==========================
function renderSocials() {
  const box = $("socialLinks");
  if (!box) return;

  box.innerHTML = "";
  profileData.socials.forEach((s) => {
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerText = s.name;
    box.appendChild(a);
  });
}

// ==========================
// ⭐ 渲染 Projects 页面内容
// ==========================
function renderProjects() {
  const box = $("projectList");
  if (!box) return;

  box.innerHTML = "";

  profileData.projects.forEach((p) => {
    const div = document.createElement("div");
    div.className = "item";

    const githubLink = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer">[GITHUB]</a>`
      : `<span style="opacity:0.4;">[GITHUB N/A]</span>`;

    const demoLink = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer">[DEMO]</a>`
      : `<span style="opacity:0.4;">[DEMO N/A]</span>`;

    div.innerHTML = `
      <div class="year">${p.id} | STATUS: ${p.status}</div>
      <div class="desc">
        <b>${p.name}</b><br/><br/>
        ${p.desc}<br/><br/>
        TECH: ${p.tech.join(" / ")}<br/><br/>
        ${githubLink}
        &nbsp;|&nbsp;
        ${demoLink}
      </div>
    `;

    box.appendChild(div);
  });
}

// ==========================
// ⭐ 渲染 Achievements 页面内容
// ==========================
function renderAchievements() {
  const box = $("achievementList");
  if (!box) return;

  box.innerHTML = "";

  profileData.achievements.forEach((a) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="year">${a.code} | ${a.year} | LEVEL: ${a.level}</div>
      <div class="desc">
        <b>${a.title}</b><br/><br/>
        ${a.desc}
      </div>
    `;

    box.appendChild(div);
  });
}

// ==========================
// ⭐ 渲染 Blog / Log 页面内容
// ==========================
function renderLogs() {
  const box = $("logList");
  if (!box) return;

  box.innerHTML = "";

  profileData.logs.forEach((l) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="year">${l.id} | ${l.date}</div>
      <div class="desc">
        <b>${l.title}</b><br/><br/>
        ${l.content}
      </div>
    `;

    box.appendChild(div);
  });
}

// ==========================
// ⭐ 首页随机推荐博客
// ==========================
function renderBlogRecommendation() {
  const box = $("blogRecommend");
  if (!box) return;

  const logs = profileData.logs || [];
  if (logs.length === 0) {
    box.innerText = "暂无日志。";
    return;
  }

  const randomIndex = Math.floor(Math.random() * logs.length);
  const blog = logs[randomIndex];

  box.innerHTML = `
    <b>${blog.title}</b> (${blog.date})<br><br>
    ${blog.content.slice(0, 140)}...<br><br>
    <a href="blog.html" class="btn">READ MORE</a>
  `;
}

// ==========================
// ⭐ 随机名言
// ==========================
function renderRandomQuote() {
  const quoteEl = $("randomQuote");
  if (!quoteEl) return;

  const quotes = [
    { text: "千里之行，始于足下。", author: "老子" },
    { text: "天才是百分之一的灵感，加上百分之九十九的努力。", author: "托马斯·爱迪生" },
    { text: "人生天地之间，若白驹过隙，忽然而已。", author: "庄子" },
    { text: "你要成为你自己，而不是别人期待的你。", author: "鲁迅" }
  ];

  const idx = Math.floor(Math.random() * quotes.length);
  quoteEl.innerText = `"${quotes[idx].text}" — ${quotes[idx].author}`;
}

// ==========================
// ⭐ 全局初始化入口（重要）
// ==========================
function initPage() {
  renderTopbar();
  renderRandomQuote();
  renderBlogRecommendation();

  // 如果当前页面存在对应容器，就渲染对应内容
  renderBio();
  renderHistory();
  renderSocials();
  renderProjects();
  renderAchievements();
  renderLogs();
}

// ==========================
// ⭐ DOM Ready
// ==========================
document.addEventListener("DOMContentLoaded", initPage);
# CLAUDE.md — 薛伯輝基金會 Love Hope Foundation

這個專案的技術慣例與現況。設計原則與工作方法見 `Design.md`。

## 專案性質

以 **Eleventy（11ty）** 產生的靜態網站。原始碼是 `src/` 下的 Nunjucks 模板,
`npm run build` 產出純靜態 HTML 到 `_site/`(不入庫),由 GitHub Actions 部署到 GitHub Pages。
產物是每頁完整、SEO 友善的 HTML —— 共用的 header/nav/footer 在 build 時就烤進每一頁。

## 目錄結構

```
src/
  _includes/base.njk   ← 共用 chrome(head/header/nav/footer/drawer/cookie)的唯一來源
  *.njk                ← 每頁:front matter + {% extends "base.njk" %} + 3 個 block
tokens.css             ← 設計變數(passthrough 到輸出根目錄)
app.css                ← 共用 chrome 樣式(passthrough)
app.js                 ← 共用 chrome 行為:back-to-top + mobile drawer(passthrough)
images/  *.pdf         ← 靜態資產(passthrough)
.eleventy.js           ← Eleventy 設定(input=src,passthrough 清單)
.github/workflows/deploy.yml  ← build + 部署 Pages
```

根目錄還留有 `news-pin-compare.html`、`docs/`、`wireframes/` 等比稿/草稿檔 —— 不在 `src/`,不會被 build。

## 頁面模板的寫法

每個 `src/*.njk` 只放「這頁獨有的東西」,共用部分由 `base.njk` 提供:

```njk
---
permalink: news.html          # 保留 .html 網址(勿改成 /news/,會斷既有連結與 SEO)
title: "最新消息 — 薛伯輝基金會"
active: news                  # 對應導覽列高亮的 key;首頁用 home(=不高亮)
---
{% extends "base.njk" %}
{% block styles %}<style> …頁面專屬 CSS… </style>{% endblock %}
{% block content %} …頁面內容… {% endblock %}
{% block scripts %}<script> …頁面專屬 JS… </script>{% endblock %}
```

- **改 header/nav/footer/drawer/cookie → 只改 `base.njk` 一個檔**(導覽列是 `navItems` 陣列驅動)。
- **改共用行為(抽屜/回頂部)→ 只改 `app.js`**。頁面專屬 JS(輪播、燈箱、render…)留在各頁 `{% block scripts %}`。
- 不要把 chrome 的 markup/JS 複製回個別頁面。

## CSS 慣例

- 載入順序(`base.njk` 的 `<head>` 已固定):`tokens.css`(變數)→ `app.css`(chrome)→ 頁面 `{% block styles %}`。
- `tokens.css` 是色彩/字級/間距的唯一來源;**用變數,不要寫死色碼**。
- 共用 chrome 樣式只住在 `app.css`,別 inline 進頁面 —— 包含 chrome 的**響應式 `@media`**(header/nav/donate 在 1100px / 720px 的覆寫)。
- 頁面 `{% block styles %}` 只放**該頁專屬**的樣式與 `@media`(hero、grid、sub-nav 等)。

## 品牌色

`--brand:#8C0A0A`(深紅)是主視覺。其他:`--brand-dark:#5C0606`、`--brand-tint:#FBEEEE`、`--ink:#111`、`--body:#333`。完整見 `tokens.css`。

## 本機開發

```
npm install      # 首次
npm run serve    # 本機預覽(localhost,自動 reload)
npm run build    # 產出 _site/
```

## 部署

push 到 `main` → GitHub Actions 自動 build + 部署 Pages。
（前提:GitHub repo 的 Settings → Pages → Source 要設為 **GitHub Actions**。）
未來若搬 GCP:`_site/` 是一包純靜態檔,丟 GCS bucket + CDN 或 Firebase Hosting 即可,無 lock-in。

## 公益小舖現況（2026-06)

採 shop-2 方向(featured 商品 + grid)。`shop.njk` 為列表(威宏的紅包袋 featured + 5 個佔位商品),
`shop-weihong.njk` 為商品/職人詳情。**待辦**:真實商品照(放 `images/shop/`)、威宏故事與規格文案(目前佔位)、
其他商品與詳情頁、實際購買/結帳機制(目前 CTA 是 `href="#"` 佔位,刻意先不接)。

## 工作守則

- 動任何檔案修改 / 寫入 / 會改狀態的指令前,先說明具體計畫(改哪個檔、改什麼、跑什麼指令),
  等明確確認後再執行。唯讀調查(讀檔、搜尋、dry-run)不需確認。

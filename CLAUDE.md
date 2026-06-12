# CLAUDE.md — 薛伯輝基金會 Love Hope Foundation

這個專案的技術慣例與現況。設計原則與工作方法見 `Design.md`。

## 專案性質

無建置流程(build-less)的靜態網站。每個頁面都是獨立的 `.html`,直接用瀏覽器開啟即可,
沒有打包、沒有框架、沒有 dev server。

## 技術棧與慣例

- **字型**:Noto Sans TC(無襯線)+ IBM Plex Serif(襯線),由 Google Fonts 載入。
- **CSS 載入順序**(每頁 `<head>` 一律照這個順序):
  1. `tokens.css` —— 設計變數(色彩、字級、間距)的唯一來源。
  2. `app.css` —— 共用 chrome 的 CSS(base reset + header / nav / 捐款帶 / footer / back-to-top / 手機抽屜)。
  3. 頁內 `<style>` —— 該頁專屬(hero、grid、sub-nav 等)。
- **不要把 chrome 的 CSS 重新 inline 進個別頁面** —— 它只住在 `app.css`,單一來源。
- **chrome 的 HTML 標記**(實際的 `<header>/<nav>/<footer>/drawer` 結構)目前仍是各頁複製貼上 ——
  改動時要讓所有頁面保持一致(從既有頁面複製)。
- 已統一的值:捐款帶背景 `#fff`(無邊框);`ul,ol{list-style:none}`。

## 品牌色

`--brand:#8C0A0A`(深紅)是主視覺。其他 token:`--brand-dark:#5C0606`、`--brand-tint:#FBEEEE`、
`--ink:#111`、`--body:#333`。完整定義見 `tokens.css` —— 用變數,不要寫死色碼。

## 頁面結構

- 兩層式結構:列表頁 → 詳情頁(如 `actions.html → actions-dimuer.html`、`shop.html → shop-weihong.html`)。
- 中英並列文字:排序慣例對齊首頁(homepage convention)。
- `*-compare.html`、`wireframes/` 等是比稿 / 草稿檔,不是正式頁面。

## 公益小舖現況(2026-06)

採 shop-2 方向(featured 商品 + grid)。`shop.html` 為列表(威宏的紅包袋為 featured + 5 個佔位商品),
`shop-weihong.html` 為商品/職人詳情。**待辦**:真實商品照(放 `images/shop/`)、威宏故事與規格文案(目前佔位)、
其他商品與詳情頁、實際購買/結帳機制(目前 CTA 是 `href="#"` 佔位,刻意先不接)。

## 工作守則

- 動任何檔案修改 / 寫入 / 會改狀態的指令前,先說明具體計畫(改哪個檔、改什麼、跑什麼指令),
  等明確確認後再執行。唯讀調查(讀檔、搜尋、dry-run)不需確認。

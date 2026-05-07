# 薛伯輝基金會 設計系統

## 設計核心原則

1. **品牌色 #8C0A0A 是主視覺** — 學 La Vie 的編輯語彙（centered hairlines / 4px micro-radius / flat-offset hover / 60×3 underline accent / dark footer），不抄它的純黑白色彩。La Vie 用 `#c5ce66` 草綠的所有地方（c-tag、hover、focus），改用 `#8C0A0A`。
2. **不要連續堆疊重色塊** — 紅色強區段與黑色 footer 之間至少留 72px 白色 padding 緩衝，避免「連擊」。
3. **編輯感靠留白與克制** — 用 hairline、typography、紅色 accent 區分輕重，不靠 box-shadow 模糊陰影、不靠漸層、不靠 emoji。
4. **View More 永遠在區段底** — 置中圓角小按鈕，不放 section header 右側並排。

## 設計 Tokens

### 色票

```css
--brand:        #8C0A0A;   /* 品牌主紅 */
--brand-dark:   #5C0606;   /* hover 加深 */
--brand-tint:   #FBEEEE;   /* trend-item hover 底 */
--ink:          #18181b;   /* 主文字、Footer */
--charcoal:     #3f3f46;   /* hairline、副標、author */
--body:         #363636;
--muted:        #71717a;
--pale:         #a1a1aa;
--line:         #dbdbdb;
--line-soft:    #e4e4e7;
--line-softer:  #f4f4f5;
--ease:         cubic-bezier(0.215,0.61,0.355,1);
```

### 字型

- `Noto Sans TC` 300/400/500/700/900 — 中文
- `IBM Plex Sans` 400/500/600/700 — 拉丁（subtitle / c-tag / 數字 / date / button / author）
- 標題 weight 500，section title 700
- letter-spacing：標題 `.04-.05em`、subtitle/button `.2-.25em`、author `.03em`
- 中文標題用 `text-align: justify`

### 間距

- Container：1344px (fullhd) / 1152px (widescreen)
- Section padding：72px 0（首個 section 用 `.is-first` 改 48px）
- Section header margin-bottom：40px
- Card grid gap：48px row × 28px col
- View More 距區段底：48px

### 圓角

- 卡片圖片、縮圖、Donate card：4px micro-radius
- Button：9999px 藥丸型
- Hero slide：直角

### Hover 兩級系統

**一般卡片低調**（article-card / trend-item / action-row）
- 圖片 `transform: scale(1.1)` 0.7s
- 標題色變 → `#8C0A0A`
- 無位移、無 shadow

**重點動作高調**（trend-feature / spot-card / donate-fact）
- 整卡位移 / underline 拉寬
- 數字 hollow → fill + 平面 text-shadow

## 元件語彙

### `.section-head`

```html
<header class="section-head">
  <div class="title-row">
    <span class="icon">SVG</span>           <!-- 只在重點區段 -->
    <h2 class="section-title">中文大標</h2>
    <span class="icon">SVG</span>
  </div>
  <p class="subtitle"><span>English</span></p>
</header>
```

- 整列置中
- subtitle 兩側 `::before` `::after` 細線 `flex:1; height:1px; background: var(--charcoal)`
- icon 只在「五大公益行動」（愛心）和「真愛多多 Spotlight」（星星）

### `.article-card`

```html
<a class="article-card">
  <figure class="article-card-image has-loading-spin"><span class="img-fill"></span></figure>
  <div class="meta">
    <span class="cat c-tag">真愛多多</span>
    <span class="date">2026 / 04 / 18</span>
  </div>
  <h3 class="title">標題</h3>
  <p class="description">...</p>     <!-- 只在人物卡保留 -->
  <div class="byline">by 編輯部</div>
</a>
```

- 圖片 9:5 + 4px 圓角
- meta `justify-content: space-between`，c-tag 與 date 兩端對齊
- 列表卡拿掉 description；人物卡保留
- 標題 `text-align: justify`
- c-tag 是純文字（紅字），不加底色 / padding

### `.trend-spread`（雜誌跨頁不對稱）

左 1.2fr 大特推 + 右 1fr 4 個橫向小條目。

**大特推：** 5:4 圖 + 紅色 160px hollow-stroke rank（白描邊在右下）。hover 填白 + `text-shadow: 5px 5px 0 var(--brand-dark)` + scale 1.08。

**小條目：** grid `80px(rk) | 1fr(body) | 110px(thumb)`。紅色 48px 編號 + meta + 兩行標題 + 70×110 縮圖。hover 整列底色變 `--brand-tint`。上下 hairline 分隔。

### `.action-row`（水平堆疊大條紋）

```html
<a class="action-row">
  <span class="num">01</span>          <!-- 88px 紅色巨型 -->
  <div class="body">
    <span class="cat">Transition</span>
    <h3>特殊生轉銜職場</h3>
    <p>...</p>
  </div>
  <div class="thumb"></div>
  <span class="arr">了解更多</span>
</a>
```

- grid `140px | 1fr | 280px | 160px`
- 上下 charcoal hairline 分隔
- hover 整列 `padding-left: 18px` 右移 + 標題變紅

### `.spot-card`（feature-card 結構）

```html
<a class="spot-card">
  <div class="spot-img">
    <span class="img-fill"></span>
    <div class="img-meta"><span class="pill">Spotlight</span>...</div>
    <span class="lnk">youtu.be/...</span>
  </div>
  <div class="spot-text">
    <div class="eyebrow">伯利恆早療中心</div>
    <h2>標題</h2>                       <!-- ::after 60×3px 紅線 -->
    <p class="quote">「<em>強調</em>...」</p>
    <div class="ctas"><a class="btn-r">主 CTA</a><a class="btn-l">次 CTA</a></div>
  </div>
</a>
```

- 1:1 兩欄
- 影音 placeholder 中央 ▶ 玻璃感圓鈕
- h2 `::after` 60×3px 紅線，hover 拉長到 90px

### `.donate-card`（contained 紅卡）

```html
<section class="section">
  <div class="wrap">
    <div class="donate-card">
      <div class="donate-text">...</div>
      <div class="donate-stats">
        <div class="donate-fact">
          <div class="n">17<sub>年</sub></div>
          <div class="t">持續陪伴慢飛家庭</div>
        </div>
        ...
      </div>
    </div>
  </div>
</section>
```

- 紅底 + 4px 圓角，包在 `.section .wrap` 裡（**不要 full-bleed**）
- 數字白色 1.5px 描邊空心字，hover 填白 + 紅色文字陰影
- 左文案 / 右三數據，中間 `border-left: 1px rgba(255,255,255,.2)` 分隔
- CTA 用 `is-lighter` 反白圓角

### Footer

- 背景 `--ink` `#18181b`
- 全資訊保留：地址、TEL、FAX、Email、郵政劃撥（基金會法定必要）
- 郵政劃撥標籤紅底白字（黑底上更突出）
- 一排 footer-links + 版權

## Header / Nav

**Header**（單層）：社群左 / Logo 中 / 搜尋 + EN + 紅色捐款 CTA 右

**Nav**：
- 白底 + 上下 charcoal hairline
- 拿掉分隔線、不 sticky
- hover/active = 紅色 24px 短底線從中央展開
- **不要把字本身變紅** — 紅色只在裝飾線

## Hero Banner

中央聚焦 1050×578 + 兩側 peek + 自動播放 5 秒。

- 直角（不要圓角）
- 標題字重 500
- 自製 vanilla JS infinite loop
- `padding: 24px 0 0` + dots `margin-top: 20px; height: 24px`
- Hero 結束接 `.section.is-first`（`padding-top: 48px`）

## Anti-patterns

- ❌ 滿版彩色 band 直接接黑色 footer
- ❌ Section header 左對齊 + 右側 View More 並排
- ❌ 卡片圖片用大圓角（>8px）
- ❌ Box-shadow 模糊陰影（只用平面色塊位移）
- ❌ Emoji 當品牌元素
- ❌ Sticky nav
- ❌ 全站每個區段都加 icon
- ❌ 紅色用在文字本身（hover 應該用紅色裝飾線、不要把字變紅）
- ❌ c-tag 加底色 / padding 變成 chip（保持純文字 tag）

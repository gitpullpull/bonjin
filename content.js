/* ============================================================
   THE BONJIN — コンテンツ定義
   文言はすべてこのファイルに集約してある。
   2026-11-12: 尾薗本人インタビューに基づく改定 v1 を反映
   （TEXT-SWAP.md 記入済みシート準拠）。
   ============================================================ */
window.SITE = {

  meta: {
    title: "THE BONJIN｜宮崎から、つくる。学生の開発集団",
    vol: "VOL. 0",
    updated: "2026-11-25",
  },

  /* ヒーロー直下の数字（実データだけを大きく。
     2026-11-17: イベント終了に伴い、イベントの数字からプロジェクトの数字へ） */
  stats: [
    { value: "6", unit: "本", label: "App Store 公開中のアプリ" },
    { value: "11", unit: "点", label: "目録に載せた作品" },
    { value: "6", unit: "人", label: "メンバー" },
    { value: "2", unit: "拠点", label: "宮崎・東京" },
  ],

  /* 1語だけ入れ替わる文 */
  rotating: {
    before: "私たちは、",
    words: ["ゲーム", "アプリ", "ホームページ", "名刺", "Tシャツ"],
    after: "を作っている。",
  },

  /* マーキーの中身（実データのみ、帯は1本だけ） */
  marquee: [
    "ゲームとアプリを作る学生の開発集団",
    "ホームページ制作",
    "名刺 × ホームページ",
    "アプリ・システム開発",
    "ゲーム開発",
    "Tシャツ",
    "App Store 公開中 6本",
    "メンバー 6人",
    "宮崎 — 東京",
    "VOL. 0",
    "THE BONJIN",
  ],


  /* 2026-11-25 リデザイン：宮崎を主体に。ヒーロー・紹介・想い・団体概要 */
  hero: {
    place: "MIYAZAKI, JAPAN — 31.9°N 131.4°E",
    copy: ["宮崎から、", "つくる。"],
    sub: "宮崎の学生がつくる、ホームページ・アプリ・ゲーム・Tシャツ。",
  },

  intro: {
    label: "About",
    heading: ["宮崎で、", "凡人がつくる。"],
    body: [
      "ゲームとアプリを作る、宮崎の学生の開発集団です。",
    ],
  },

  message: {
    label: "Message",
    heading: "凡人が、作り続ける。",
    body: [
      "特別な人間はいない。いるのは、作り続けている普通の人間だけ。",
    ],
  },

  company: {
    label: "Overview",
    heading: "団体概要",
    rows: [
      ["名称", "THE BONJIN（ザ・ボンジン）"],
      ["拠点", "宮崎県（宮崎大学）／東京"],
      ["事業", "ホームページ制作／名刺 × ホームページ 同時開発／アプリ・システム開発／アプリ開発／ゲーム開発／Tシャツ事業"],
      ["メンバー", "6人"],
      ["対応エリア", "宮崎県を中心に（メールでのご相談は県外からも受け付けます）"],
      ["連絡先", "itwoshiyou@gmail.com"],
    ],
  },

  /* 仕事（事業）— 2026-11-24 追加。
     example = 「こんな依頼に」（想定される依頼の例。実績ではない）
     works   = 実績（実在するものだけ。[表示名, URL, 補足]） */
  services: {
    lead: "小さな依頼から、気軽にご相談ください。",
    items: [
      {
        no: "01",
        name: "ホームページ制作",
        en: "WEBSITE",
        status: "応相談",
        body: "企画から公開まで、まるごと。",
        points: ["企画と文章の整理", "デザイン", "実装（動きのある演出も）", "公開・独自ドメインの設定"],
        examples: ["中小企業の会社紹介サイト", "店舗の、営業時間と地図が分かるページ"],
        works: [
          ["THE BONJIN 公式サイト（このサイト）", "https://bonjin.gitpullpull.me", "企画・デザイン・実装・WebGL作品"],
          ["page.gitpullpull.me", "https://page.gitpullpull.me", "個人のリンク集"],
        ],
      },
      {
        no: "02",
        name: "名刺 × ホームページ 同時開発",
        en: "CARD + WEB",
        status: "受付中",
        body: "名刺とスマホページを、同じデザインで。",
        lp: "web.html",
        student: "student.html",
        points: ["名刺のデザイン", "QRコードの作成", "スマホ用プロフィールページ", "名刺とページのデザインをそろえる"],
        examples: ["就活・学会・ビジコン用の名刺と自己紹介ページ", "フリーランスの名刺と作品ページ", "店舗のショップカードとメニューページ"],
        works: [
          ["尾薗圭亮の名刺ページ", "https://itoshiyou.github.io/business-card/index.html", "名刺から開くプロフィール"],
        ],
      },
      {
        no: "03",
        name: "アプリ・システム開発",
        en: "SYSTEM",
        status: "受付中",
        body: "手作業の仕事を、AIで仕組みに。",
        lp: "ai.html",
        lpLabel: "中小企業のAI業務改善はこちら →",
        points: ["業務の自動化", "LLM・画像生成の組み込み", "API・サーバーの構築", "学習・試験対策のシステム"],
        examples: ["毎週の集計や画像作りを自動にするツール", "社内・部内向けの予約や管理の仕組み", "AIを使った問い合わせ対応や文章整理"],
        works: [
          ["LINEスタンプ生成パイプライン", null, "市場分析→画像生成→リサイズを5分で自動完結（Ollama × Draw Things × FastAPI）"],
          ["骨学試験対策システム", null, "医学部の試験対策（制作中）"],
          ["D-CoT（小型LLMの推論効率化）", "https://arxiv.org/abs/2602.21786", "gitpullpull／人工知能学会 全国大会優秀賞"],
        ],
      },
      {
        no: "04",
        name: "アプリ開発",
        en: "iPHONE APP",
        status: "受付中",
        body: "企画から App Store 公開まで。",
        points: ["企画", "画面デザイン", "iPhoneアプリの実装", "App Store への申請・公開"],
        examples: ["お店や団体のオリジナルアプリ", "授業・資格勉強のための学習アプリ", "趣味やコミュニティ向けの小さな道具"],
        works: [
          ["App Store 公開中 6本", "apps.html", "Focus Wave（環境音）／ハンダン（学習）ほか"],
          ["肉眼解剖学本試験 (beta)", "https://plicy.net/User/76215", "医学生向けの試験対策"],
        ],
      },
      {
        no: "05",
        name: "ゲーム開発",
        en: "GAME",
        status: "受付中",
        body: "パズルからミニゲームまで。",
        points: ["企画とステージ設計", "ドット絵・グラフィック", "iPhone向け・ブラウザ向け", "宣伝・イベント用のミニゲーム"],
        examples: ["商品やイベントの宣伝用ミニゲーム", "学園祭・展示で遊べるブラウザゲーム", "教材として使える学習ゲーム"],
        works: [
          ["ロウソク行脚", "https://apps.apple.com/jp/app/id6822286730", "パズル・全6章150ステージ"],
          ["光の窓割り", "https://apps.apple.com/jp/app/id6824348602", "パズル・全66面"],
          ["つみあげ出前", "https://apps.apple.com/jp/app/id6829997215", "パズル・全8店"],
          ["おもいで百貨店", "https://apps.apple.com/jp/app/id6829372905", "ドット絵の放置ゲーム"],
          ["ブラウザゲーム（plicy）", "https://plicy.net/User/76215", "伊藤しよう"],
        ],
      },
      {
        no: "06",
        name: "Tシャツ事業",
        en: "T-SHIRT",
        status: "準備中",
        body: "オリジナルTシャツと、おそろい制作。",
        points: ["THE BONJIN オリジナルTシャツの販売", "デザインの持ち込みにも、ゼロからの相談にも対応", "ロゴ・イラスト・手書き文字のデータ化", "枚数・色・サイズは相談して決める"],
        examples: ["サークル・ゼミ・部活のおそろいTシャツ", "学園祭やイベントのスタッフTシャツ", "お店・団体のロゴ入りユニフォーム", "手書きのイラストや文字を、そのままTシャツに"],
        works: [
          ["THE BONJIN オリジナルTシャツ", null, "「凡人」の墨とロゴ。販売開始はこのページで告知します"],
        ],
      },
    ],
    flow: ["相談（無料）", "内容と見積もりの確認", "制作（途中で確認）", "公開・納品"],
    contact: {
      text: "内容が決まっていなくても大丈夫です。",
      links: [
        ["メール", "mailto:itwoshiyou@gmail.com", "itwoshiyou@gmail.com"],
      ],
    },
  },

  /* メンバーについて（改定 v1 — 「母体」の語は使わない） */
  about: {
    heading: "メンバーについて",
    body: [
      "THE Bonjinは、メンバー6人で活動しています。公開しているのは尾薗圭亮、gitpullpull、伊藤しよう、生方の4人で、梶川ともう一人は COMING SOON です。メンバーの募集はしていません。",
      "尾薗は運営・企画・制作を担います。生方は技術的サポートを担います。",
    ],
    note: null,
  },

  /* メンバー（台帳形式）— 6人。公開4人＋COMING SOON 2人 */
  members: [
    {
      no: "001",
      name: "尾薗 圭亮",
      page: "members/ozono.html",
      reading: "OZONO KEITO",
      role: "運営・企画・制作",
      tags: ["宮崎大学医学部医学科"],
      bio: "電気通信大学に進んだあと、医学部を受け直して宮崎大学医学部医学科に入った。高卒認定から再受験までの記録をnoteに350本書いている。医学の勉強をしながらアプリとゲームを作り、2026年10月にiPhoneアプリを3本公開し、11月にも3本を追加して計6本になった。「覚えるより、なんでそうなるのかを考えてから覚えるほうが楽」という側の人間。宅建は2026年10月に受験、結果待ち。野球と絵は休止中、作曲はたまにしている。",
      facts: [
        ["作ったもの", "App Storeに6本公開中（ロウソク行脚／光の窓割り／Focus Wave／おもいで百貨店／ハンダン／つみあげ出前）"],
        ["経歴", "高卒認定 → 電気通信大学 → 再受験 → 宮崎大学医学部医学科"],
      ],
      links: [
        ["X", "https://x.com/itoushiyou", "@itoushiyou"],
        ["Instagram", "https://www.instagram.com/keito_ozono/", "@keito_ozono"],
        ["GitHub", "https://github.com/itoshiyou", "ItoShiyou"],
        ["note", "https://note.com/kohs2021", "三日月を待とう"],
        ["名刺ページ", "https://itoshiyou.github.io/business-card/index.html", "business-card"],
      ],
    },
    {
      no: "002",
      name: "gitpullpull",
      page: "members/gitpullpull.html",
      reading: "GITPULLPULL",
      role: "運営",
      tags: ["ML Engineer", "人工知能学会'26 全国大会優秀賞"],
      bio: "小型言語モデルが考えすぎる問題（overthinking）を抑える研究「D-CoT」で、2026年度 人工知能学会全国大会 優秀賞を単著で受賞。セキュリティキャンプ2024修了、CODE BLUE 2025 学生スタッフ。THE Bonjinでは運営を担当する。このサイトの編集と実装も担当。",
      facts: [
        ["研究", "D-CoT: Disciplined Chain-of-Thought（小型LLMの推論効率化）"],
        ["受賞", "人工知能学会 全国大会優秀賞（2026・単著）"],
        ["連絡先", "gitpull@muse.ai"],
      ],
      links: [
        ["受賞（学会公式）", "https://www.ai-gakkai.or.jp/about/award/jsai_award-conf/", "人工知能学会 受賞者ページ"],
        ["X", "https://x.com/gitpullpull", "@gitpullpull"],
        ["GitHub", "https://github.com/gitpullpull", "gitpullpull"],
        ["論文", "https://arxiv.org/abs/2602.21786", "arXiv:2602.21786"],
        ["リンク集", "https://page.gitpullpull.me", "page.gitpullpull.me"],
      ],
    },
    {
      no: "003",
      name: "梶川",
      reading: "KAJIKAWA",
      role: "COMING SOON",
      tags: [],
      bio: null,
      facts: [],
      links: [],
    },
    {
      no: "004",
      name: "伊藤しよう",
      reading: "ITO SHIYOU",
      role: "ウェブで公開されているゲームの公開を担当",
      tags: [],
      /* 暫定文（v2で最終確定）: 謎のある短文にし、他のメンバーとの関係には触れない */
      bio: "ウェブの片隅でゲームを公開している。それ以外のことは、あまり分かっていない。",
      facts: [
        ["作ったもの", "ブラウザゲーム（plicyで公開中）"],
      ],
      links: [
        ["GitHub", "https://github.com/itoshiyou", "itoshiyou"],
        ["X", "https://x.com/itoushiyou", "@itoushiyou"],
        ["plicy", "https://plicy.net/User/76215", "伊藤しよう"],
        ["YouTube", "https://www.youtube.com/@itoshiyou", "@itoshiyou"],
      ],
    },
    {
      no: "005",
      name: "生方",
      reading: "UBUKATA",
      role: "技術的サポート",
      tags: [],
      bio: null, // 詳細は本人の回答で v2 確定
      facts: [],
      links: [],
    },
    {
      no: "006",
      name: "COMING SOON",
      reading: "",
      role: "",
      tags: [],
      bio: null, // 名前・詳細は非公開
      facts: [],
      links: [],
    },
  ],

  /* 目録（hook は改定 v1 で現状維持が確定） */
  products: [
    { status: "公開中", title: "ロウソク行脚", hook: "歩くたびに短くなるロウソクで、夜の洋館に灯りをともす。", meta: "パズル / 全6章150ステージ / App Store", url: "https://apps.apple.com/jp/app/id6822286730" },
    { status: "公開中", title: "光の窓割り", hook: "数字を手がかりにマスを区切り、ステンドグラスに光を取り戻す。", meta: "パズル / 全66面 / App Store", url: "https://apps.apple.com/jp/app/id6824348602" },
    { status: "公開中", title: "Focus Wave", hook: "雨、焚き火、カフェ、波の音を指で置く。自分の音の空間。", meta: "環境音 / iPhone / App Store", url: "https://apps.apple.com/jp/app/id6824796019" },
    { status: "公開中", title: "おもいで百貨店", hook: "昭和のデパート屋上をドット絵でよみがえらせる、のんびり放置ゲーム。", meta: "放置ゲーム / App Store", url: "https://apps.apple.com/jp/app/id6829372905" },
    { status: "公開中", title: "ハンダン", hook: "日常の判断の考え方を、短いカードと場面クイズで学ぶ。", meta: "学習 / App Store", url: "https://apps.apple.com/jp/app/id6831944228" },
    { status: "公開中", title: "つみあげ出前", hook: "料理を頭の上に積み上げて届ける。拾う順番がすべて。", meta: "パズル / 全8店 / App Store", url: "https://apps.apple.com/jp/app/id6829997215" },
    { status: "BETA", title: "肉眼解剖学本試験 (beta)", hook: "医学生最大の難所、解剖学の本試験対策。", meta: "学習 / plicy", url: "https://plicy.net/User/76215" },
    { status: "制作中", title: "The Taling.", hook: "日々の積み重ねをAIがビジュアル小説化する。解放は1日5分だけ。", meta: "ライフログ", url: null },
    { status: "制作中", title: "投資学習・ひだまりルーム", hook: "AIコンパニオンと一緒に株価を学ぶ。", meta: "みやざきビジネスコンテスト2026出展プラン", url: null },
    { status: "制作中", title: "LINEスタンプ生成パイプライン", hook: "市場分析から画像生成、リサイズまで5分で自動完結させる。", meta: "Ollama × Draw Things × FastAPI", url: null },
    { status: "制作中", title: "骨学試験対策システム", hook: "骨の名前は、試験の前に覚える。", meta: "学習", url: null },
  ],

  footer: {
    org: "THE BONJIN",
    credits: [
      ["発行", "THE BONJIN"],
      ["編集・実装", "gitpullpull"],
      ["メンバー", "尾薗圭亮 ／ gitpullpull ／ 梶川 ／ 伊藤しよう ／ 生方 ／ ほか"],
    ],
    links: [
      ["旧サイト", "https://itoshiyou.github.io/thebonjin/"],
      ["GitHub (itoshiyou/thebonjin)", "https://github.com/itoshiyou/thebonjin"],
      ["仕事の依頼・相談", "#services"],
      ["AI業務改善（中小企業向け）", "ai.html"],
      ["作品「九十度」", "art/02-kyujudo/index.html"],
      ["作品「足跡」", "art/03-ashiato/index.html"],
      ["作品「一滴」", "art/01-itteki/index.html"],
      ["公式LINE（新作・お知らせ）", "https://line.me/R/ti/p/@629zrowt"],
    ],
    colophon: "宮崎でつくっています。書体: Shippori Mincho, Zen Kaku Gothic New, Cormorant Garamond。",
  },
};

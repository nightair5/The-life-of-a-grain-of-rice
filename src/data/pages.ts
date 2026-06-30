import { riceAssets } from "./assets";

export type PageVisual =
  | "home"
  | "seed"
  | "solar"
  | "work"
  | "harvest"
  | "table"
  | "waste"
  | "culture"
  | "action";

export type PageLayout =
  | "cosmos"
  | "soil"
  | "timeline"
  | "field"
  | "harvest"
  | "table"
  | "compare"
  | "scroll"
  | "pledge";

export type PageInteraction =
  | "seed"
  | "solar"
  | "harvest"
  | "bowl"
  | "compare"
  | "culture"
  | "action";

export type PosterTitleLine = {
  text: string;
  indent?: number;
};

export type RiceImage = {
  src: string;
  alt: string;
  role: "hero" | "background" | "panel";
  position?: string;
};

export type SolarTerm = {
  name: string;
  icon: "rain" | "grain" | "seed" | "dew" | "sun";
  note: string;
};

export type ActionChoice = {
  id: string;
  label: string;
  icon: "bowl" | "plate" | "grain";
};

export type RicePage = {
  id: string;
  visual: PageVisual;
  layout: PageLayout;
  seal: string;
  title: string;
  titleLines: PosterTitleLine[];
  bodyLines: string[];
  insight: string;
  actionLabel?: string;
  image: RiceImage;
  interaction?: PageInteraction;
  solarTerms?: SolarTerm[];
  comparison?: {
    save: {
      label: string;
      bodyLines: string[];
      image: string;
    };
    waste: {
      label: string;
      bodyLines: string[];
      image: string;
    };
  };
  actionChoices?: ActionChoice[];
};

export const ricePages: RicePage[] = [
  {
    id: "home",
    visual: "home",
    layout: "cosmos",
    seal: "起",
    title: "一粒米的一生",
    titleLines: [{ text: "一粒米的" }, { text: "一生", indent: 34 }],
    bodyLines: ["你吃下的一粒米，", "走过了多远的路？"],
    insight: "它像一颗小小宇宙，藏着田野、日光、水声和人的双手。",
    actionLabel: "开始体验",
    image: {
      src: riceAssets.home.main,
      alt: "一粒米里藏着田野与晨光",
      role: "hero",
      position: "50% 46%",
    },
  },
  {
    id: "seed",
    visual: "seed",
    layout: "soil",
    seal: "种",
    title: "它曾是一粒种子",
    titleLines: [{ text: "它曾是" }, { text: "一粒种子", indent: 26 }],
    bodyLines: ["在春风抵达田野之前，", "一粒米先把自己交给土地。"],
    insight: "所有丰收，都从一次安静的入土开始。轻点种子，看根系重新生长。",
    actionLabel: "继续",
    image: {
      src: riceAssets.seed.main,
      alt: "种子在土壤中萌发根系",
      role: "hero",
      position: "50% 52%",
    },
    interaction: "seed",
  },
  {
    id: "solar-land",
    visual: "solar",
    layout: "timeline",
    seal: "时",
    title: "它跟着节气长大",
    titleLines: [{ text: "它跟着" }, { text: "节气长大", indent: 22 }],
    bodyLines: ["春耕、夏耘、秋收、冬藏，", "中国人的时间，曾写在土地上。"],
    insight: "节气不是日历，是土地和人共同遵守的时间秩序。",
    actionLabel: "继续",
    image: {
      src: riceAssets.solar.main,
      alt: "节气里的田野与水乡",
      role: "background",
      position: "50% 40%",
    },
    interaction: "solar",
    solarTerms: [
      { name: "谷雨", icon: "rain", note: "雨生百谷" },
      { name: "小满", icon: "grain", note: "麦气初满" },
      { name: "芒种", icon: "seed", note: "有芒之谷" },
      { name: "白露", icon: "dew", note: "露凝为白" },
      { name: "秋分", icon: "sun", note: "昼夜均分" },
    ],
  },
  {
    id: "work",
    visual: "work",
    layout: "field",
    seal: "耕",
    title: "它经过无数双手",
    titleLines: [{ text: "它经过" }, { text: "无数双手", indent: 28 }],
    bodyLines: ["你看见的是一碗饭，", "他们经历的是一整季。"],
    insight: "弯腰、插秧、灌溉、守望，每一步都把土地变成粮食。",
    actionLabel: "继续",
    image: {
      src: riceAssets.farming.main,
      alt: "农人在晨光水田中耕作",
      role: "background",
      position: "50% 45%",
    },
  },
  {
    id: "harvest",
    visual: "harvest",
    layout: "harvest",
    seal: "收",
    title: "它终于成熟",
    titleLines: [{ text: "它终于" }, { text: "成熟", indent: 42 }],
    bodyLines: ["风吹过稻浪的时候，", "一整季的等待有了回声。"],
    insight: "请横向滑动，让金色光线完成一次收割。",
    actionLabel: "继续",
    image: {
      src: riceAssets.harvest.main,
      alt: "金色稻田和成熟稻穗",
      role: "background",
      position: "50% 48%",
    },
    interaction: "harvest",
  },
  {
    id: "table",
    visual: "table",
    layout: "table",
    seal: "食",
    title: "它来到你的餐桌",
    titleLines: [{ text: "它来到" }, { text: "你的餐桌", indent: 22 }],
    bodyLines: ["从泥土到饭碗，", "每一口都不该被轻易浪费。"],
    insight: "一碗米饭的尽头，不该是垃圾桶。",
    actionLabel: "继续",
    image: {
      src: riceAssets.table.main,
      alt: "餐桌上的米饭与田野光线",
      role: "background",
      position: "50% 52%",
    },
    interaction: "bowl",
  },
  {
    id: "waste",
    visual: "waste",
    layout: "compare",
    seal: "惜",
    title: "一粒米，有两种结局",
    titleLines: [{ text: "一粒米，" }, { text: "有两种结局", indent: 12 }],
    bodyLines: ["同一碗饭，", "会因为一次选择走往不同方向。"],
    insight: "左右拖动，看看一碗饭的两种结局。",
    actionLabel: "继续",
    image: {
      src: riceAssets.compare.save,
      alt: "珍惜粮食的餐桌",
      role: "panel",
      position: "50% 50%",
    },
    interaction: "compare",
    comparison: {
      save: {
        label: "珍惜",
        bodyLines: ["吃多少，盛多少。", "碗里干净，心里踏实。"],
        image: riceAssets.compare.save,
      },
      waste: {
        label: "浪费",
        bodyLines: ["剩下的不是饭，", "是被忽略的土地与劳动。"],
        image: riceAssets.compare.waste,
      },
    },
  },
  {
    id: "culture",
    visual: "culture",
    layout: "scroll",
    seal: "礼",
    title: "惜粮，是中国人的文明底色",
    titleLines: [
      { text: "惜粮，是" },
      { text: "中国人的", indent: 28 },
      { text: "文明底色", indent: 8 },
    ],
    bodyLines: [
      "农耕文明教会我们敬天惜物。",
      "一粥一饭，来处不易；",
      "半丝半缕，恒念物力维艰。",
    ],
    insight: "珍惜粮食，不是旧观念，而是面向未来的生活方式。",
    actionLabel: "继续",
    image: {
      src: riceAssets.culture.main,
      alt: "稻穗、山水与饭碗的文化意象",
      role: "background",
      position: "50% 45%",
    },
    interaction: "culture",
  },
  {
    id: "action",
    visual: "action",
    layout: "pledge",
    seal: "行",
    title: "今天，从这一餐开始",
    titleLines: [
      { text: "今天，" },
      { text: "从这一餐", indent: 20 },
      { text: "开始", indent: 62 },
    ],
    bodyLines: ["一粒米走过土地、节气与双手，", "最后停在你的碗里。"],
    insight: "选择一个承诺，把惜粮变成今天的行动。",
    actionLabel: "生成我的行动海报",
    image: {
      src: riceAssets.action.main,
      alt: "米粒与稻穗组成的行动意象",
      role: "hero",
      position: "50% 50%",
    },
    interaction: "action",
    actionChoices: [
      { id: "portion", label: "今天吃多少，盛多少", icon: "bowl" },
      { id: "clean-plate", label: "我愿意加入光盘行动", icon: "plate" },
      { id: "cherish", label: "我愿意珍惜每一粒米", icon: "grain" },
    ],
  },
];

const image = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;
const cutout = (fileName: string) => image(`cutouts/${fileName}`);

export type DecorAssetSlot =
  | "hero"
  | "soil"
  | "timeline"
  | "field"
  | "worker"
  | "harvest"
  | "sheaf"
  | "table"
  | "compare"
  | "culture"
  | "action"
  | "gesture";

export type DecorAsset = {
  src: string;
  alt: string;
  slot: DecorAssetSlot;
};

export type AssetVisual =
  | "home"
  | "seed"
  | "solar"
  | "work"
  | "harvest"
  | "table"
  | "waste"
  | "culture"
  | "action";

export const riceAssets = {
  home: {
    main: image("home-rice.webp"),
    universe: cutout("home-rice-universe.webp"),
  },
  seed: {
    main: image("seed.webp"),
    soil: cutout("seed-soil-cutaway.webp"),
    root: cutout("seed-root-network.webp"),
  },
  solar: {
    main: image("solar-terms.webp"),
    timeline: cutout("solar-timeline-land.webp"),
  },
  farming: {
    main: image("farming.webp"),
    field: cutout("farming-water-field.webp"),
    worker: cutout("farming-worker-mist.webp"),
  },
  harvest: {
    main: image("harvest.webp"),
    wave: cutout("harvest-rice-wave.webp"),
    sheaf: cutout("harvest-front-sheaf.webp"),
  },
  table: {
    main: image("table.webp"),
    bowlSteam: cutout("table-bowl-steam.webp"),
  },
  compare: {
    save: image("compare-save.webp"),
    waste: image("compare-waste.webp"),
    panel: cutout("compare-panel-cutout.webp"),
    control: cutout("compare-control.webp"),
  },
  culture: {
    main: image("culture.webp"),
    scroll: cutout("culture-scroll-wash.webp"),
    riceLine: cutout("culture-rice-line.webp"),
  },
  action: {
    main: image("poster-bg.webp"),
    branch: cutout("action-rice-branch.webp"),
    posterBranch: cutout("poster-branch-cutout.webp"),
  },
  ui: {
    tapGesture: cutout("ui-tap-gesture.webp"),
    dragGesture: cutout("ui-drag-gesture.webp"),
    check: cutout("ui-check.webp"),
  },
} as const;

export const pageDecorAssets: Record<AssetVisual, DecorAsset[]> = {
  home: [
    { src: riceAssets.home.universe, alt: "透明底米粒宇宙", slot: "hero" },
  ],
  seed: [
    { src: riceAssets.seed.soil, alt: "透明底土壤剖面", slot: "soil" },
    { src: riceAssets.seed.root, alt: "透明底根系", slot: "gesture" },
  ],
  solar: [
    { src: riceAssets.solar.timeline, alt: "透明底节气田野", slot: "timeline" },
  ],
  work: [
    { src: riceAssets.farming.field, alt: "透明底水田", slot: "field" },
    { src: riceAssets.farming.worker, alt: "透明底农人晨雾", slot: "worker" },
  ],
  harvest: [
    { src: riceAssets.harvest.wave, alt: "透明底金色稻浪", slot: "harvest" },
    { src: riceAssets.harvest.sheaf, alt: "透明底前景稻穗", slot: "sheaf" },
  ],
  table: [
    { src: riceAssets.table.bowlSteam, alt: "透明底饭碗蒸汽", slot: "table" },
  ],
  waste: [
    { src: riceAssets.compare.panel, alt: "透明底珍惜浪费对比画面", slot: "compare" },
    { src: riceAssets.compare.control, alt: "透明底对比滑块", slot: "gesture" },
  ],
  culture: [
    { src: riceAssets.culture.scroll, alt: "透明底宣纸画卷", slot: "culture" },
    { src: riceAssets.culture.riceLine, alt: "透明底水墨稻穗线条", slot: "gesture" },
  ],
  action: [
    { src: riceAssets.action.branch, alt: "透明底稻米行动图形", slot: "action" },
  ],
};

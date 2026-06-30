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
    source: image("rice-home.png"),
    universe: cutout("home-rice-universe.png"),
  },
  seed: {
    main: image("seed.webp"),
    source: image("rice-seed.png"),
    soil: cutout("seed-soil-cutaway.png"),
    root: cutout("seed-root-network.png"),
  },
  solar: {
    main: image("solar-terms.webp"),
    source: image("rice-solar-land.png"),
    timeline: cutout("solar-timeline-land.png"),
  },
  farming: {
    main: image("farming.webp"),
    source: image("rice-work.png"),
    field: cutout("farming-water-field.png"),
    worker: cutout("farming-worker-mist.png"),
  },
  harvest: {
    main: image("harvest.webp"),
    source: image("rice-harvest.png"),
    wave: cutout("harvest-rice-wave.png"),
    sheaf: cutout("harvest-front-sheaf.png"),
  },
  table: {
    main: image("table.webp"),
    source: image("rice-table.png"),
    bowlSteam: cutout("table-bowl-steam.png"),
  },
  compare: {
    save: image("compare-save.webp"),
    waste: image("compare-waste.webp"),
    source: image("rice-waste.png"),
    panel: cutout("compare-panel-cutout.png"),
    control: cutout("compare-control.png"),
  },
  culture: {
    main: image("culture.webp"),
    source: image("rice-culture.png"),
    scroll: cutout("culture-scroll-wash.png"),
    riceLine: cutout("culture-rice-line.png"),
  },
  action: {
    main: image("poster-bg.webp"),
    source: image("rice-action.png"),
    branch: cutout("action-rice-branch.png"),
    posterBranch: cutout("poster-branch-cutout.png"),
  },
  ui: {
    tapGesture: cutout("ui-tap-gesture.png"),
    dragGesture: cutout("ui-drag-gesture.png"),
    check: cutout("ui-check.png"),
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

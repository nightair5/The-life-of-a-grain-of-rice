# 一粒米的一生

移动端 H5 互动公益广告项目，主题为珍惜粮食、农耕文明、从田间到餐桌。

## 技术栈

- Vite
- React
- TypeScript
- Framer Motion
- html2canvas
- CSS

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173/`。

## 打包

```bash
npm run build
```

打包结果会输出到 `docs/`，用于 GitHub Pages 静态访问。

## 项目结构

```text
src/
  components/   H5 页面组件、互动组件和海报生成组件
  data/         页面内容、素材映射和旅程状态文案
public/images/ 运行时图片素材
docs/          GitHub Pages 发布目录，由 npm run build 生成
```

## 作品说明

作品由 9 张新中式公益互动海报组成，包含：

- 米粒生命旅程翻页体验
- 种子生长、节气时间轴、滑动收割、珍惜/浪费对比
- 行动承诺选择
- 可下载的行动分享海报

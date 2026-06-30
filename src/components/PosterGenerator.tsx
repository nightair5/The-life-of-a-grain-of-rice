import { useEffect, useRef, useState } from "react";
import { riceAssets } from "../data/assets";

const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1920;

type PosterGeneratorProps = {
  selectedAction: string;
  journeySummary?: string;
  onClose?: () => void;
};

function getActionSeal(selectedAction: string) {
  if (selectedAction.includes("盛饭")) {
    return "节";
  }

  if (selectedAction.includes("光盘")) {
    return "净";
  }

  if (selectedAction.includes("提醒")) {
    return "传";
  }

  return "惜";
}

function drawTextLine(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    font: string;
    color: string;
    align?: CanvasTextAlign;
  },
) {
  context.font = options.font;
  context.fillStyle = options.color;
  context.textAlign = options.align ?? "left";
  context.textBaseline = "top";
  context.fillText(text, x, y);
}

function drawNativePoster(selectedAction: string, journeySummary?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = POSTER_WIDTH;
  canvas.height = POSTER_HEIGHT;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is unavailable.");
  }

  context.fillStyle = "#f7f1df";
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

  const glow = context.createRadialGradient(540, 420, 30, 540, 420, 560);
  glow.addColorStop(0, "rgba(199, 154, 56, 0.3)");
  glow.addColorStop(1, "rgba(199, 154, 56, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

  context.strokeStyle = "rgba(199, 154, 56, 0.42)";
  context.lineWidth = 3;
  context.strokeRect(78, 78, POSTER_WIDTH - 156, POSTER_HEIGHT - 156);

  context.strokeStyle = "rgba(33, 75, 56, 0.22)";
  context.beginPath();
  context.arc(540, 480, 168, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "rgba(199, 154, 56, 0.42)";
  context.beginPath();
  context.arc(540, 480, 226, 0, Math.PI * 2);
  context.stroke();

  context.save();
  context.translate(540, 484);
  context.rotate(-0.62);
  context.fillStyle = "#d2a23b";
  for (let index = 0; index < 7; index += 1) {
    const y = -126 + index * 36;
    context.beginPath();
    context.ellipse(-34, y, 18, 42, 0.28, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.ellipse(34, y + 16, 18, 42, -0.28, 0, Math.PI * 2);
    context.fill();
  }
  context.strokeStyle = "#214b38";
  context.lineWidth = 7;
  context.beginPath();
  context.moveTo(0, -158);
  context.lineTo(0, 176);
  context.stroke();
  context.restore();

  drawTextLine(context, "一粒米的一生", 540, 744, {
    font: "700 104px serif",
    color: "#123426",
    align: "center",
  });

  drawTextLine(context, "我已加入“珍惜每一粒米”行动", 540, 930, {
    font: "600 48px serif",
    color: "#214b38",
    align: "center",
  });

  drawTextLine(context, selectedAction, 540, 1068, {
    font: "700 66px serif",
    color: "#c79a38",
    align: "center",
  });

  context.strokeStyle = "rgba(199, 154, 56, 0.55)";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(804, 1078, 54, 0, Math.PI * 2);
  context.stroke();
  drawTextLine(context, getActionSeal(selectedAction), 804, 1034, {
    font: "700 76px serif",
    color: "#c79a38",
    align: "center",
  });

  drawTextLine(context, "一粒米的一生，值得被认真对待。", 540, 1240, {
    font: "400 42px serif",
    color: "#53645b",
    align: "center",
  });

  drawTextLine(
    context,
    journeySummary ?? "你已陪一粒米走到最后一餐。",
    540,
    1320,
    {
      font: "400 34px serif",
      color: "#6d7b70",
      align: "center",
    },
  );

  drawTextLine(context, "从田间到餐桌，珍惜每一口饭。", 540, 1692, {
    font: "500 42px serif",
    color: "#123426",
    align: "center",
  });

  return canvas;
}

function normalizePosterSize(sourceCanvas: HTMLCanvasElement) {
  if (
    sourceCanvas.width === POSTER_WIDTH &&
    sourceCanvas.height === POSTER_HEIGHT
  ) {
    return sourceCanvas;
  }

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = POSTER_WIDTH;
  outputCanvas.height = POSTER_HEIGHT;

  const context = outputCanvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is unavailable.");
  }

  context.drawImage(sourceCanvas, 0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  return outputCanvas;
}

export default function PosterGenerator({
  selectedAction,
  journeySummary,
  onClose,
}: PosterGeneratorProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function generatePoster() {
      setPosterUrl("");
      setErrorMessage("");
      setIsGenerating(true);

      try {
        if (document.fonts) {
          await document.fonts.ready;
        }

        await new Promise((resolve) => {
          window.requestAnimationFrame(resolve);
        });

        const posterElement = posterRef.current;

        if (!posterElement) {
          throw new Error("Poster element is unavailable.");
        }

        const imagePromises = Array.from(posterElement.querySelectorAll("img"))
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
          );

        await Promise.all(imagePromises);

        const posterRect = posterElement.getBoundingClientRect();
        const scale = POSTER_WIDTH / posterRect.width;
        const { default: html2canvas } = await import("html2canvas");

        const canvas = await html2canvas(posterElement, {
          backgroundColor: "#f7f1df",
          logging: false,
          scale,
          useCORS: true,
          width: posterRect.width,
          height: posterRect.height,
        });

        if (isCurrent) {
          setPosterUrl(normalizePosterSize(canvas).toDataURL("image/png"));
        }
      } catch {
        try {
          const fallbackCanvas = drawNativePoster(selectedAction, journeySummary);

          if (isCurrent) {
            setPosterUrl(fallbackCanvas.toDataURL("image/png"));
          }
        } catch {
          if (isCurrent) {
            setErrorMessage("海报生成失败，请稍后再试。");
          }
        }
      } finally {
        if (isCurrent) {
          setIsGenerating(false);
        }
      }
    }

    generatePoster();

    return () => {
      isCurrent = false;
    };
  }, [selectedAction, journeySummary]);

  const handleDownload = () => {
    if (!posterUrl) {
      return;
    }

    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = "rice-action-poster.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="poster-generator"
      aria-label="行动分享海报"
      onClick={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onTouchEnd={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <div className="poster-rise-grains" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="poster-artboard" ref={posterRef}>
        <img
          className="poster-bg-image"
          src={riceAssets.action.posterBranch}
          alt=""
          draggable="false"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="poster-inner-frame">
          <div className="poster-action-seal" aria-hidden="true">
            {getActionSeal(selectedAction)}
          </div>
          <div className="poster-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="poster-copy-block">
            <p className="poster-kicker">行动分享海报</p>
            <h2>一粒米的一生</h2>
            <p className="poster-main-copy">我已加入“珍惜每一粒米”行动</p>
            <strong>{selectedAction}</strong>
            <p className="poster-sub-copy">一粒米的一生，值得被认真对待。</p>
            <p className="poster-journey-copy">
              {journeySummary ?? "你已陪一粒米走到最后一餐。"}
            </p>
          </div>

          <p className="poster-footer-copy">从田间到餐桌，珍惜每一口饭。</p>
        </div>
      </div>

      <div className="poster-actions">
        <button
          className="poster-download-button"
          type="button"
          disabled={!posterUrl || isGenerating}
          onClick={handleDownload}
        >
          下载海报
        </button>
        {onClose ? (
          <button className="poster-close-button" type="button" onClick={onClose}>
            返回选择
          </button>
        ) : null}
        {isGenerating ? <p>海报生成中</p> : null}
        {errorMessage ? <p className="poster-error">{errorMessage}</p> : null}
      </div>
    </section>
  );
}

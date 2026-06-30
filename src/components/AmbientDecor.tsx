import { motion } from "framer-motion";
import { useState } from "react";
import { pageDecorAssets } from "../data/assets";
import type { PageVisual } from "../data/pages";

type AmbientDecorProps = {
  visual: PageVisual;
};

export default function AmbientDecor({ visual }: AmbientDecorProps) {
  const [failedAssets, setFailedAssets] = useState<Record<string, boolean>>({});
  const assets = pageDecorAssets[visual];

  return (
    <div className={`ambient-decor ambient-${visual}`} aria-hidden="true">
      <motion.span
        className="ambient-ring ambient-ring-one"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="ambient-ring ambient-ring-two"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />

      {assets.map((asset, index) =>
        failedAssets[asset.src] ? null : (
          <motion.img
            key={asset.src}
            className={`ambient-img ambient-img-${asset.slot}`}
            src={asset.src}
            alt=""
            draggable="false"
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            onError={() =>
              setFailedAssets((current) => ({ ...current, [asset.src]: true }))
            }
          />
        ),
      )}
    </div>
  );
}

type ProgressDotsProps = {
  currentPage: number;
  totalPages: number;
  onSelect: (pageIndex: number) => void;
};

export default function ProgressDots({
  currentPage,
  totalPages,
  onSelect,
}: ProgressDotsProps) {
  return (
    <nav className="progress-dots" aria-label="页面进度">
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index === currentPage;

        return (
          <button
            key={index}
            type="button"
            className={isActive ? "progress-dot active" : "progress-dot"}
            onClick={() => onSelect(index)}
            aria-label={`前往第 ${index + 1} 页`}
            aria-current={isActive ? "step" : undefined}
          />
        );
      })}
    </nav>
  );
}

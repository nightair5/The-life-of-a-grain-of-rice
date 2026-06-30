type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
  onSelect: (pageIndex: number) => void;
};

export default function PageIndicator({
  currentPage,
  totalPages,
  onSelect,
}: PageIndicatorProps) {
  return (
    <nav className="page-indicator" aria-label="页面进度">
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index === currentPage;

        return (
          <button
            key={index}
            type="button"
            className={isActive ? "indicator-dot active" : "indicator-dot"}
            onClick={() => onSelect(index)}
            aria-label={`前往第 ${index + 1} 页`}
            aria-current={isActive ? "step" : undefined}
          />
        );
      })}
    </nav>
  );
}

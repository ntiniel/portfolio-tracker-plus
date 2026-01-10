import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, X, ZoomIn, ZoomOut, Move } from "lucide-react";

interface FloatingPdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
}

const FloatingPdfViewer = ({ isOpen, onClose, pdfUrl }: FloatingPdfViewerProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
      if (isResizing && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({
          width: Math.max(400, e.clientX - rect.left),
          height: Math.max(300, e.clientY - rect.top)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  if (!isOpen || !pdfUrl) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-50 bg-card border-2 border-primary/30 rounded-xl shadow-2xl overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
      }}
    >
      {/* Header - Draggable */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/20 cursor-move select-none"
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-primary/60" />
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Visualizador de PDF</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="h-7 w-7 p-0 hover:bg-primary/20"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[40px] text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="h-7 w-7 p-0 hover:bg-primary/20"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-7 w-7 p-0 hover:bg-destructive/20 hover:text-destructive ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="w-full h-[calc(100%-40px)] overflow-auto bg-muted/20">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
            width: `${100 / (zoom / 100)}%`,
            height: `${100 / (zoom / 100)}%`
          }}
          title="PDF Viewer"
        />
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-primary/30 transition-colors"
        onMouseDown={handleResizeMouseDown}
        style={{
          background: 'linear-gradient(135deg, transparent 50%, hsl(var(--primary) / 0.3) 50%)'
        }}
      />
    </div>
  );
};

export default FloatingPdfViewer;

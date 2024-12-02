import React from 'react';
import { Position } from '../../../types/components';

interface DragGuidesProps {
  position: Position;
  canvasComponents: { position: Position; id: string }[];
  activeId?: string | null;
}

const SNAP_THRESHOLD = 5;

const DragGuides: React.FC<DragGuidesProps> = ({ position, canvasComponents, activeId }) => {
  const guides = React.useMemo(() => {
    const verticalGuides: number[] = [];
    const horizontalGuides: number[] = [];

    // Diğer komponentlerle hizalanma noktalarını bul
    canvasComponents.forEach(comp => {
      if (comp.id === activeId) return;

      // Yatay hizalama
      if (Math.abs(position.y - comp.position.y) < SNAP_THRESHOLD) {
        horizontalGuides.push(comp.position.y);
      }

      // Dikey hizalama
      if (Math.abs(position.x - comp.position.x) < SNAP_THRESHOLD) {
        verticalGuides.push(comp.position.x);
      }
    });

    return { verticalGuides, horizontalGuides };
  }, [position, canvasComponents, activeId]);

  return (
    <>
      {/* Yatay kılavuz çizgileri */}
      {guides.horizontalGuides.map((y, index) => (
        <div
          key={`h-${index}`}
          className="absolute left-0 right-0 bg-blue-500 pointer-events-none"
          style={{
            top: y,
            height: '1px',
            zIndex: 1000,
          }}
        />
      ))}

      {/* Dikey kılavuz çizgileri */}
      {guides.verticalGuides.map((x, index) => (
        <div
          key={`v-${index}`}
          className="absolute top-0 bottom-0 bg-blue-500 pointer-events-none"
          style={{
            left: x,
            width: '1px',
            zIndex: 1000,
          }}
        />
      ))}
    </>
  );
};

export default DragGuides;
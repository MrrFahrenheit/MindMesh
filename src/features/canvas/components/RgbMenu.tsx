import { Pipette, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { MindMeshNodeData } from '../../../types/IWorkPlace';

interface RgbMenuProps {
  initialColor?: string;
  onClose: () => void;
  editingNodeId:string;
  nodesOnBoard:Array<MindMeshNodeData>;
  setNodesOnBoard:React.Dispatch<React.SetStateAction<Array<MindMeshNodeData>>>;
}

export default function RgbMenu({ initialColor = "#3b82f6", editingNodeId, onClose, nodesOnBoard, setNodesOnBoard }: RgbMenuProps) {
  const [hex, setHex] = useState(initialColor);
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  

  const onColorChange = (color: string | null) => {
    if (!editingNodeId) return;

    setNodesOnBoard((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === editingNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              textColor: color === null ? undefined : color,
            },
          };
        }
        return node;
      })
    );
    console.log(nodesOnBoard)
    if (color) setHex(color);
      };

  useEffect(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      setRgb({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      });
    }
  }, [hex]);

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    const newHex = "#" + ((1 << 24) + (newRgb.r << 16) + (newRgb.g << 8) + newRgb.b).toString(16).slice(1).toUpperCase();
    setHex(newHex);
    onColorChange(newHex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onColorChange(value);
    }
  };

  return (
    <div className="fixed z-[100] bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-xl p-4 w-64 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pipette size={16} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Color Picker</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Preview del Color */}
      <div 
        className="w-full h-12 rounded-lg mb-4 border border-white/20 shadow-inner transition-colors duration-200"
        style={{ backgroundColor: hex }}
      />

      {/* Sliders RGB */}
      <div className="space-y-3 mb-4">
        {['r', 'g', 'b'].map((channel) => (
          <div key={channel} className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase w-3 text-muted-foreground">{channel}</span>
            <input
              type="range"
              min="0"
              max="255"
              value={rgb[channel as keyof typeof rgb]}
              onChange={(e) => handleRgbChange(channel as 'r' | 'g' | 'b', parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-[10px] tabular-nums w-6">{rgb[channel as keyof typeof rgb]}</span>
          </div>
        ))}
      </div>

      {/* Input HEX */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">HEX</span>
        <input
          type="text"
          value={hex}
          onChange={handleHexInput}
          className="w-full bg-muted/50 border border-border rounded-lg py-2 pl-10 pr-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          placeholder="#FFFFFF"
        />
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {/* Paleta rápida de ejemplo */}
        {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'].map((c) => (
          <button
            key={c}
            onClick={() => { setHex(c); onColorChange(c); }}
            className="h-6 w-full rounded-md border border-white/10 hover:scale-110 transition-transform"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}
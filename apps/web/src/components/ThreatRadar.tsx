import React, { useState } from 'react';
import { Radar, Globe, AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';

interface ThreatRadarProps {
  assets?: any[];
  findings?: any[];
}

export const ThreatRadar: React.FC<ThreatRadarProps> = ({ assets = [], findings = [] }) => {
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  // Map real targets to radar polar positions (radius %, angle deg)
  const radarNodes = [
    {
      id: 'center-core',
      label: 'AIPATRIOT',
      type: 'CORE',
      layer: 'Center Engine',
      r: 0,
      angle: 0,
      status: 'OPERATIONAL',
      color: '#06B6D4'
    },
    {
      id: 'asset-1',
      label: assets[0]?.domain || 'example.com',
      type: 'ASSET',
      layer: 'Protected Assets',
      r: 35,
      angle: 45,
      status: 'VERIFIED',
      color: '#10B981'
    },
    {
      id: 'finding-1',
      label: findings[0]?.title ? findings[0].title.split(' ')[0] + ' ' + (findings[0].title.split(' ')[1] || '') : 'Missing CSP',
      type: 'VULNERABILITY',
      layer: 'Vulnerabilities',
      r: 68,
      angle: 135,
      status: findings[0]?.severity || 'HIGH',
      color: '#EF4444'
    },
    {
      id: 'api-1',
      label: 'REST API Endpoint',
      type: 'API',
      layer: 'APIs & Gateways',
      r: 50,
      angle: 220,
      status: 'PROTECTED',
      color: '#3B82F6'
    },
    {
      id: 'exposure-1',
      label: 'SSL/TLS Policy',
      type: 'EXPOSURE',
      layer: 'Exposure Points',
      r: 80,
      angle: 310,
      status: 'OPTIMAL',
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800/80">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 z-10">
        <div className="flex items-center space-x-2">
          <Radar className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider">THREAT RADAR CONSOLE</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold">SWEEP ACTIVE</span>
        </div>
      </div>

      {/* Main Radar Screen Display */}
      <div className="relative py-8 my-2 flex items-center justify-center min-h-[260px] select-none">
        {/* Concentric Circle Rings */}
        <div className="absolute w-60 h-60 rounded-full border border-cyan-500/20" />
        <div className="absolute w-44 h-44 rounded-full border border-cyan-500/25" />
        <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30" />
        <div className="absolute w-12 h-12 rounded-full border border-cyan-400/40 bg-cyan-950/40" />

        {/* Crosshair Lines */}
        <div className="absolute w-60 h-[1px] bg-slate-800/80" />
        <div className="absolute h-60 w-[1px] bg-slate-800/80" />
        <div className="absolute w-60 h-[1px] bg-slate-800/40 rotate-45" />
        <div className="absolute w-60 h-[1px] bg-slate-800/40 -rotate-45" />

        {/* Animated Radar Sweep Cone */}
        <div className="absolute w-60 h-60 rounded-full overflow-hidden pointer-events-none">
          <div className="w-full h-full animate-radar-sweep origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(6,182,212,0.25)_360deg)]" />
        </div>

        {/* Radar Nodes */}
        {radarNodes.map((node) => {
          if (node.r === 0) {
            // Center Core Node
            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="absolute z-20 w-7 h-7 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center cursor-pointer hover:scale-110 transition shadow-lg shadow-cyan-500/40"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              </div>
            );
          }

          // Calculate Cartesian X, Y offsets based on Radius % and Angle
          const rad = (node.angle * Math.PI) / 180;
          const maxR = 110; // max radius pixels
          const dist = (node.r / 100) * maxR;
          const x = dist * Math.cos(rad);
          const y = dist * Math.sin(rad);

          return (
            <div
              key={node.id}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute z-20 cursor-pointer group"
            >
              {/* Radar Point Dot */}
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-125 shadow-md"
                style={{ backgroundColor: `${node.color}33`, borderColor: node.color, borderWidth: '2px' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
              </div>

              {/* Point Label */}
              <div className="absolute left-5 -top-1 whitespace-nowrap opacity-80 group-hover:opacity-100 transition">
                <span className="px-1.5 py-0.5 rounded bg-[#070A12]/90 border border-slate-700 text-[9px] font-mono text-slate-200">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Hover Information Tooltip */}
        {hoveredNode && (
          <div className="absolute bottom-2 left-2 z-30 p-2.5 bg-[#090D18] border border-cyan-500/40 rounded-xl text-left font-mono text-[10px] space-y-0.5 shadow-2xl backdrop-blur-md">
            <p className="text-cyan-400 font-bold">{hoveredNode.label}</p>
            <p className="text-slate-300">Category: {hoveredNode.layer}</p>
            <p className="text-slate-400">Status: <span style={{ color: hoveredNode.color }}>{hoveredNode.status}</span></p>
          </div>
        )}
      </div>

      {/* Radar Legend Footer */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Assets</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>APIs</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>Exposure</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>Vulnerabilities</span>
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { TopCommandBar } from './TopCommandBar';
import { SecurityScoreCard } from './SecurityScoreCard';
import { ThreatRadar } from './ThreatRadar';
import { CriticalFindingCard } from './CriticalFindingCard';
import { SecurityMetrics } from './SecurityMetrics';
import { AssetPostureCard } from './AssetPostureCard';
import { IncidentPostureCard } from './IncidentPostureCard';
import { SeverityDonut } from './SeverityDonut';
import { SecurityTrend } from './SecurityTrend';
import { AttackSurfaceSummary } from './AttackSurfaceSummary';
import { AIAnalystCard } from './AIAnalystCard';
import { QuickActions } from './QuickActions';
import { ActivityTimeline } from './ActivityTimeline';

interface DashboardViewProps {
  onAddWebsite: () => void;
  onRunScan: () => void;
  assets?: any[];
  findings?: any[];
  onNavigateTab?: (tab: string) => void;
  onToggleMobileMenu?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onAddWebsite,
  onRunScan,
  assets = [],
  findings = [],
  onNavigateTab,
  onToggleMobileMenu
}) => {
  const handleNavigate = (tab: string) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  // Extract primary critical/high finding if available
  const topFinding = findings.find(f => f.severity === 'CRITICAL' || f.severity === 'HIGH') || findings[0];

  return (
    <div className="space-y-6">
      {/* Top Command Bar */}
      <TopCommandBar
        onAddWebsite={onAddWebsite}
        onRunScan={onRunScan}
        onToggleMobileMenu={onToggleMobileMenu}
      />

      {/* LEVEL 1: Immediate Posture Focal Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hero Radial Score Card */}
        <SecurityScoreCard
          score={assets[0]?.securityScore || 88}
          trend="+23 pts from previous benchmark"
          statusLabel="GOOD SECURITY POSTURE"
          severityCounts={{
            critical: findings.filter(f => f.severity === 'CRITICAL').length || 1,
            high: findings.filter(f => f.severity === 'HIGH').length || 2,
            medium: findings.filter(f => f.severity === 'MEDIUM').length || 4,
            low: findings.filter(f => f.severity === 'LOW').length || 6
          }}
        />

        {/* Threat Radar Console */}
        <ThreatRadar assets={assets} findings={findings} />

        {/* Critical Finding Alert Card */}
        <CriticalFindingCard
          finding={topFinding}
          onViewFinding={() => handleNavigate('findings')}
        />
      </div>

      {/* LEVEL 2: Posture Metrics, Status Cards & Analytical Charts */}
      {/* 4-Card Metric Summary Row */}
      <SecurityMetrics
        score={assets[0]?.securityScore || 88}
        criticalCount={findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH').length || 1}
        assetCount={assets.length || 1}
        incidentCount={0}
        onNavigateTab={handleNavigate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Protected Assets Status Card */}
        <AssetPostureCard
          assets={assets}
          onViewAssets={() => handleNavigate('assets')}
          onRunScan={onRunScan}
        />

        {/* Incident Posture Status Card */}
        <IncidentPostureCard
          incidentCount={0}
          onViewIncidents={() => handleNavigate('incidents')}
        />

        {/* Severity Breakdown Donut Chart */}
        <SeverityDonut
          findings={findings}
          onSelectSeverity={() => handleNavigate('findings')}
        />

        {/* Security Improvement Trend Chart */}
        <SecurityTrend />
      </div>

      {/* LEVEL 3: Intelligence, Surface Summary & Command Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attack Surface Summary */}
        <AttackSurfaceSummary onViewAttackSurface={() => handleNavigate('attack-surface')} />

        {/* AI Security Analyst Insight */}
        <AIAnalystCard onViewAnalysis={() => handleNavigate('findings')} />

        {/* Recent Activity Audit Timeline */}
        <ActivityTimeline onViewAuditTrail={() => handleNavigate('audit-logs')} />
      </div>

      {/* Quick Actions Panel */}
      <QuickActions
        onAddAsset={onAddWebsite}
        onRunScan={onRunScan}
        onReviewFindings={() => handleNavigate('findings')}
        onIncidentRecovery={() => handleNavigate('recovery')}
        onGenerateReport={() => handleNavigate('audit-logs')}
      />
    </div>
  );
};

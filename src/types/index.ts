export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'G' | 'F';

export interface PlayerContractYear {
  season: string;
  amount: number;
  type: 'guaranteed' | 'player_option' | 'team_option' | 'non_guaranteed' | 'qualifying_offer' | 'two_way';
}

export interface PlayerStats {
  ppg: number;
  rpg: number;
  apg: number;
  spg?: number;
  bpg?: number;
  fgPct?: number;
  threePct?: number;
  ftPct?: number;
  per: number;
  epm?: number;
  ws?: number;
  gamesPlayed: number;
  minutesPerGame: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  number: number;
  position: Position;
  secondaryPosition?: Position;
  age: number;
  height: string;
  weight: string;
  experienceYears: number;
  salary: number; // Current season salary in USD
  contractYears: PlayerContractYear[];
  stats: PlayerStats;
  rating: number; // 60 - 99 overall rating
  isStarter?: boolean;
  tradeKickerPercent?: number; // e.g. 15 for 15% trade kicker
  noTradeClause?: boolean;
  tradeRestrictionUntil?: string; // Date if recently signed (e.g. '2025-01-15')
  isTwoWay?: boolean;
  isExpiring?: boolean;
  imageUrl?: string;
}

export interface DraftPick {
  id: string;
  year: number;
  round: 1 | 2;
  originalTeamId: string;
  currentTeamId: string;
  protection?: string; // e.g. "Top-4 Protected, conveys to 2026", "Unprotected", "Top-10 Protected"
  isSwap?: boolean;
  swapWithTeamId?: string;
  notes?: string;
}

export interface TeamCapFigures {
  salaryCap: number; // $140,588,000 for 24-25, $154,647,000 for 25-26
  luxuryTaxThreshold: number; // $170,814,000 for 24-25, $187,895,000 for 25-26
  firstApron: number; // $178,132,000 for 24-25, $195,945,000 for 25-26
  secondApron: number; // $188,931,000 for 24-25, $207,824,000 for 25-26
  activeCapHit: number;
  deadMoney: number;
  capExceptions: {
    name: string;
    amount: number;
    expires?: string;
  }[];
  hardCappedAt?: 'first_apron' | 'second_apron' | null;
}

export interface Team {
  id: string;
  name: string;
  city: string;
  nickname: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: 'Atlantic' | 'Central' | 'Southeast' | 'Northwest' | 'Pacific' | 'Southwest';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  record: { wins: number; losses: number };
  offensiveRating: number;
  defensiveRating: number;
  capFigures: TeamCapFigures;
  roster: Player[];
  draftPicks: DraftPick[];
  teamNeeds: string[];
  strategicDirection: 'Championship Contender' | 'Playoff Hopeful' | 'Retooling / Competitive' | 'Full Rebuild / Youth';
  logoSvg?: string;
}

export interface TradedItem {
  type: 'player' | 'pick' | 'cash';
  player?: Player;
  pick?: DraftPick;
  cashAmount?: number;
  fromTeamId: string;
  toTeamId: string;
}

export interface TeamTradeSlot {
  teamId: string;
  outgoingPlayers: Player[];
  incomingPlayers: Player[];
  outgoingPicks: DraftPick[];
  incomingPicks: DraftPick[];
  outgoingCash: number;
  incomingCash: number;
}

export interface TeamCBACheck {
  teamId: string;
  teamName: string;
  teamAbbreviation: string;
  isLegal: boolean;
  preTradeSalary: number;
  outgoingSalary: number;
  incomingSalary: number;
  netSalaryChange: number;
  postTradeSalary: number;
  maxAllowableIncomingSalary: number;
  matchingRuleApplied: string;
  ruleViolations: string[];
  warningNotes: string[];
  createdTradeException?: { amount: number };
  absorbedViaTradeException?: boolean;
  preApronStatus: 'under_cap' | 'over_cap_under_tax' | 'taxpayer' | 'first_apron' | 'second_apron';
  postApronStatus: 'under_cap' | 'over_cap_under_tax' | 'taxpayer' | 'first_apron' | 'second_apron';
  projectedTaxBillBefore: number;
  projectedTaxBillAfter: number;
  rosterSizeBefore: number;
  rosterSizeAfter: number;
}

export interface TradeValidationResult {
  isLegal: boolean;
  teamResults: Record<string, TeamCBACheck>;
  globalIssues: string[];
}

export interface AITeamGrade {
  teamId: string;
  teamName: string;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';
  winNowImpact: string; // e.g. "+3 to +5 projected regular season wins"
  futureOutlook: string;
  financialImpact: string;
  tacticalFit: string;
  pros: string[];
  cons: string[];
}

export interface AITradeAnalysis {
  summary: string;
  verdict: string;
  overallFairnessScore: number; // 0 - 100
  teamGrades: AITeamGrade[];
  tacticalAnalysis: string;
  financialAndCapAnalysis: string;
  counterProposalSuggestion?: string;
  winnerTeamId?: string;
}

export interface TradeIdea {
  id: string;
  title: string;
  headline: string;
  rationale: string;
  difficulty: 'Realistic' | 'Ambitious' | 'Blockbuster';
  involvedTeamIds: string[];
  items: {
    fromTeamId: string;
    toTeamId: string;
    description: string;
    itemType: 'player' | 'pick' | 'cash';
    playerId?: string;
    pickId?: string;
    cashAmount?: number;
  }[];
}

export interface SavedTradeScenario {
  id: string;
  title: string;
  createdAt: string;
  involvedTeamIds: string[];
  tradedItems: TradedItem[];
  cbaPassed: boolean;
  aiVerdict?: string;
  notes?: string;
}

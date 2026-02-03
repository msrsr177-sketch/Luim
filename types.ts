
// Fix: Added React import to define the React namespace used in React.ReactNode
import React from 'react';

export interface CardData {
  id: string;
  title: string;
  value: string;
  trend?: string;
  icon: string;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
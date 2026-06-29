import React from 'react';

type BadgeStatus = 'concluido' | 'em-andamento' | 'pendencia';

interface BadgeProps {
  status: BadgeStatus;
  children: React.ReactNode;
}

export function Badge({ status, children }: BadgeProps) {
  const statusStyles = {
    'concluido': 'bg-status-success-bg text-status-success-text',
    'em-andamento': 'bg-status-progress-bg text-status-progress-text',
    'pendencia': 'bg-status-warning-bg text-status-warning-text',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {children}
    </span>
  );
}

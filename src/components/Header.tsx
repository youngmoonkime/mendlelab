import React from 'react';

export const Header: React.FC = () => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-20 pointer-events-none flex justify-between items-center text-sm md:text-base font-pixel tracking-wider text-white/90"
      style={{
        paddingTop: 'max(24px, calc(env(safe-area-inset-top) + 12px))',
        paddingLeft: 'max(24px, calc(env(safe-area-inset-left) + 12px))',
        paddingRight: 'max(24px, calc(env(safe-area-inset-right) + 12px))'
      }}
    >
      <span className="drop-shadow-sm select-none">Mendlelab</span>
      <span className="drop-shadow-sm select-none text-white/60">Jeju, 2026</span>
    </header>
  );
};

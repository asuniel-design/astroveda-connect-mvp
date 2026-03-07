export const AURA_CONFIG = {
  niel: { color: 'from-blue-600/20', glow: 'shadow-blue-500/20', label: 'Intellectual Blue' },
  sharma: { color: 'from-amber-600/20', glow: 'shadow-amber-500/20', label: 'Saffron Wisdom' },
  pallavi: { color: 'from-emerald-600/20', glow: 'shadow-emerald-500/20', label: 'Healing Green' },
  DEFAULT: { color: 'from-purple-600/20', glow: 'shadow-purple-500/20', label: 'Cosmic Violet' }
};

export const getAura = (id) => AURA_CONFIG[id] || AURA_CONFIG['DEFAULT'];

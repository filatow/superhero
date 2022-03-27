export const HOUR_IN_MS = 3_600_000;
// export const HOUR_IN_MS = 5_000;

export const USERNAME_MIN_LENGTH = 5;

export const PASSWORD_MIN_LENGTH = 5;

export const SESSION_TOKEN_LENGTH = 140;

export const USER_ID_LENGTH = 20;

export const CHARCODE_OF_A = 65;

export const CHARCODE_OF_Z = 90;

export const DEFAULT_POWERUP_AMOUNT = 3;

export const TOTAL_HERO_AMOUNT = 731;

export const ProfilePowerup = {
  CAPTAIN_AMERICA_SHIELD: {
    name: 'Captain America shield',
    image: '../assets/images/powerups/captain-america-shield.jpg',
    description: {
      powername: 'durability',
      value: '+10'
    },
    usesCount: DEFAULT_POWERUP_AMOUNT,
  },
  MJOLNIR: {
    name: 'Mjolnir',
    image: '../assets/images/powerups/mjolnir.jpg',
    description: {
      powername: 'power',
      value: '+10'
    },
    usesCount: 5,
  },
  IRONMAN_NANO_ARMOR: {
    name: 'Ironman nano armor',
    image: '../assets/images/powerups/ironman-nano-armor.jpg',
    description: {
      powername: 'combat',
      value: '+10'
    },
    usesCount: DEFAULT_POWERUP_AMOUNT,
  },
  DR_STRANGE_CLOAK: {
    name: 'Dr. Strange\'s cloak',
    image: '../assets/images/powerups/dr-strange-cloak.jpg',
    description: {
      powername: 'intelligence',
      value: '+10'
    },
    usesCount: 0,
  },
  GREEN_LANTERN_RING: {
    name: 'Green lantern\'s ring',
    image: '../assets/images/powerups/green-lantern-ring.jpg',
    description: {
      powername: 'strength',
      value: '+10'
    },
    usesCount: 1,
  },
  FLASH_BOOTS: {
    name: 'Flash boots',
    image: '../assets/images/powerups/flash-boots.jpg',
    description: {
      powername: 'speed',
      value: '+10'
    },
    usesCount: DEFAULT_POWERUP_AMOUNT,
  }
}

export const POWERUP_NAMES = [
  'durability',
  'power',
  'combat',
  'intelligence',
  'strength',
  'speed',
];

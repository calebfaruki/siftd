export type ItemWrap = {
  score: any[];
  item: Item;
};

export type Item = {
  xSourceId: any;
  _id: any;
  title: any;
  blurb: any;
  rating: any;
  type: any;
  sub: any;
  freeUntil: any;
  notes: any;
  xArticle: any;
  xVideo: any;
  xSource: any;
  sVideo: any;
  sArticle: any;
  preview: any;
  previewId: any;
  author: any;
  publishTime: any;
  __v: any;
  bookmarks: any;
  oneups: any;
  comments: any;
  history: any;
  images: any;
  eval: any;
  sGallery: any;
  tags: any;
  categories: any;
  games: any;
  twitter: any;
  facebook: any;
  pinned: any;
  skipSift: any;
  published: any;
  publishDate: any;
  date: string;
};

export type User = {
  _id: string;
  trialUntil: string;
  joinDate: string;
  plan: string;
  gravatar: string;
  verifyKey: string;
  dob: string;
  flatEmail: string;
  email: string;
  lowername: string;
  username: string;
  __v: number;
  lastOnline: string;
  siftRatings: Record<string, number>;
  evalRatings: Record<string, number>;
  readForumThreads: Record<string, number[]>;
  skills: Record<string, number>;
  avatar: string;
  uploadedAvatar: string;
  lastForumActivities: Record<string, string>;
  lastForumSessions: Record<string, string>;
  banner: string;
  bannerUrl: string;
  background: string;
  sentChanges: boolean;
  bigTipper: boolean;
  crews: string[];
  social: {
    patreon: {
      id: string;
      token: string;
      avatar: string;
      amount: number;
    };
  };
  notifications: number;
  followGames: number[];
  unsubscribed: boolean;
  prefs: {
    hideFooter: boolean;
    hideStartHere: boolean;
    extendedQuotes: boolean;
    hideHistory: boolean;
    atNotifications: boolean;
    allNotifications: boolean;
    replyNotifications: boolean;
    noNotifications: boolean;
    dynamicBackground: boolean;
    darkBackground: boolean;
    autoLinkEmbeds: boolean;
    autoLinkImages: boolean;
    straightToComments: boolean;
    autoOpenArticles: boolean;
    autoLoadSift: boolean;
  };
  achievementsLog: {
    achievement: string;
    date: string;
    _id: string;
  }[];
  achievements: string[];
  banned: boolean;
  admin: number;
  subType: number;
  pastDueWarnings: {
    one: boolean;
  };
  trialWarnings: {
    zero: boolean;
    one: boolean;
    three: boolean;
  };
  socialRegister: boolean;
  xp: {
    date: string;
    next: number;
    current: number;
    level: number;
    daily: number;
    total: number;
  };
  verified: boolean;
  subStatus: {
    access: number;
    patreon: number;
  };
};

export type Comment = {
  _id: string;
  parent: string | null;
  children?: Comment[];
  text: string;
  content: number;
  blog: any | null;
  author: {
    _id: string;
    avatar: string;
    joinDate: string;
    gravatar: string;
    username: string;
    lastOnline: string;
    bigTipper: boolean;
    social: {
      patreon: {
        amount: number;
      };
    };
    banned: boolean;
    admin: number;
    subType: number;
    xp: {
      level: number;
    };
  };
  __v: number;
  history: string[];
  deleted: boolean;
  confidence: number;
  downs: number;
  ups: number;
  parents: string[];
  date: string;
};

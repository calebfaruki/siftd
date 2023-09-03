export {};

declare global {
  interface IPostWrap {
    score: any[];
    item: IPost;
  }

  interface INotification {
    _id: string;
    key: string;
    user: string;
    type: string;
    content: any;
    blog: any;
    comment: Comment;
    count: number;
    date: string;
  }

  interface IPost {
    __v: any;
    _id: any;
    title: any;
    blurb: any;
    rating: any;
    type: any;
    sub: any;
    freeUntil: any;
    notes: any;
    preview: any;
    previewId: any;
    author: IUser;
    publishTime: any;
    bookmarks: any;
    oneups: any;
    comments: any;
    history: any;
    images: any;
    eval: any;
    sGallery: any;
    tags: any;
    categories: string[];
    games: any;
    twitter: any;
    facebook: any;
    pinned: any;
    skipSift: any;
    published: any;
    publishDate: any;
    date: string;
    xArticle: any;
    xVideo: any;
    sVideo: any;
    sArticle: any;
    xSource: string;
    xSourceId: {
      __v: number;
      _id: string;
      feed: string;
      icon: string;
      name: string;
      savedIcon: string;
      site: string;
    };
  }

  interface IUser {
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
  }

  interface IComment {
    _id: string;
    parent: string | null;
    children?: IComment[];
    text: string;
    content: number;
    blog: any | null;
    author: IUser;
    __v: number;
    history: string[];
    deleted: boolean;
    confidence: number;
    downs: number;
    ups: number;
    parents: string[];
    date: string;
  }
}

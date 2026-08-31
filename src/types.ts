export type ParkRegion = '서부' | '중부' | '동부';
export type RiverBank = '강북' | '강남';

export interface ParkHighlight {
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface DeliveryZoneInfo {
  zoneNumbers: string[];
  description: string;
  recommendedPickup: string;
  popularMenus: string[];
}

export interface TentZoneInfo {
  isAllowed: boolean;
  allowedAreas: string;
  operatingMonths: string;
  operatingHours: string;
  rules: string[];
}

export interface FountainInfo {
  hasFountain: boolean;
  name?: string;
  schedule?: string[];
  notes?: string;
}

export interface ParkingInfo {
  totalSpaces: number;
  lotCount: number;
  rates: string;
  tip: string;
}

export interface HangangPark {
  id: string;
  name: string;
  nameEn: string;
  region: ParkRegion;
  bank: RiverBank;
  summary: string;
  description: string;
  heroTagline: string;
  address: string;
  subway: string;
  subwayDetails: string[];
  rating: number;
  reviewsCount: number;
  images: string[];
  tags: string[];
  mapCoords: {
    x: number; // percentage on SVG river map (0-100)
    y: number; // percentage on SVG river map (0-100)
  };
  coords: {
    lat: number;
    lng: number;
  };
  highlights: ParkHighlight[];
  deliveryInfo: DeliveryZoneInfo;
  tentInfo: TentZoneInfo;
  fountainInfo: FountainInfo;
  parkingInfo: ParkingInfo;
  amenities: {
    convenienceStore: boolean;
    convenienceStoreCount: number;
    bikeRental: boolean;
    waterSports: boolean;
    swimmingPool: boolean;
    campingSite: boolean;
    dronePark: boolean;
    skatePark: boolean;
    restrooms: number;
    cafes: boolean;
    viewCafe: boolean;
    cruise: boolean;
  };
  nearbyAttractions: string[];
  recommendedTime: string;
  bestActivities: string[];
}

export interface HangangCourse {
  id: string;
  title: string;
  subtitle: string;
  target: '연인 (데이트)' | '친구 (피크닉/먹방)' | '가족 (아이와 함께)' | '혼자 (힐링/산책)' | '라이더 (자전거)';
  duration: string;
  distance: string;
  recommendedParkId: string;
  timeline: {
    time: string;
    place: string;
    activity: string;
    tip: string;
  }[];
  packingList: string[];
  budgetEst: string;
}

export interface RamenRecipe {
  id: string;
  name: string;
  noodle: string;
  toppings: string[];
  cookTip: string;
  pairing: string;
  badge: string;
  difficulty: '쉬움' | '보통' | '마스터';
}

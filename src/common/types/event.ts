export interface EventLocation {
  latitude: number;
  longitude: number;
}

export interface Event {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  sales?: {
    public?: {
      startDateTime: string;
      endDateTime: string;
    };
  };
  dates?: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
  };
  classifications?: Array<{
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }>;
  _embedded?: {
    venues?: Array<{
      id: string;
      name: string;
      type: string;
      location?: {
        longitude: string;
        latitude: string;
      };
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
    }>;
  };
}

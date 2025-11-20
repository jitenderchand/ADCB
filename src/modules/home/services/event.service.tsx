import httpRequest, { IRequestConfig } from "@/utils/request";
import GlobalConfig from "@/utils/globalConfig";
import { Event } from "@/common/types/event";

export interface EventsResponse {
  _embedded?: {
    events?: Event[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface GetEventsParams {
  city?: string;
  countryCode?: string;
  size?: number;
  page?: number;
  keyword?: string;
}

const prepareEventApiConfig = (params?: GetEventsParams): IRequestConfig => {
  return {
    method: "GET",
    url: GlobalConfig.getApiUrlFromRoot("/discovery/v2/events"),
    data: params,
  };
};

export class EventService {
  static async getEvents(params?: GetEventsParams): Promise<EventsResponse> {
    const response = await httpRequest(prepareEventApiConfig(params));
    return response as EventsResponse;
  }
}

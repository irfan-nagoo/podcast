import { PodcastActionType, ResponseStatusType } from "../../shared/constants/poadcast-constants";

export interface Message {
    action?: PodcastActionType,
    status: ResponseStatusType,
    text: string,
    content?: any
}

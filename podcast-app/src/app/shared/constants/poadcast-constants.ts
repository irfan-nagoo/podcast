
export enum SortByType {
    DEFAULT = "default",
    NEWEST = "Newest",
    TITLE = "Title",
    MOST_RATED = "Most Rated"
}

export enum SearchType {
    NEXT_PAGE = 1,
    NEW_SEARCH
}

export enum UserActionType {
    CREATE = "Create New Podcast",
    APPROVE = "Approve Podcasts"
}

export enum PodcastActionType {
    CREATE = 1,
    MODIFY,
    DELETE
}

export enum ResponseStatusType {
    SUCCESS = 1,
    ERROR
}

export enum FilterFieldType {
    CATEGORY = "category",
    TAGS = "tags",
    DUARTAION = "duration"
}


// Messages
// Note: Messages are generally better handled in the backend considering locale
export const PODCAST_ADDED_SUCCESS = "Podcast added successfully";
export const PODCAST_ADDED_ERROR = "An error has occured while adding Podcast. Please try again later."
export const PODCAST_MODIFIED_SUCCESS = "Podcast modified successfully";
export const PODCAST_MODIFIED_ERROR = "An error has occured while modifying Podcast. Please try again later."
export const API_INVOCATION_ERROR = "An error has occured while fetching data. Please try again later.";
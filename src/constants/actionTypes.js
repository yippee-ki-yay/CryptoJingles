export const CATEGORY_OPTIONS = [{ value: 'pagination', label: 'All jingles' }, { value: 'sale', label: 'For sale' }];
export const SAMPLE_SORTING_OPTIONS = [
  { value: '-rarity', label: 'Rarest first' },
  { value: 'rarity', label: 'Most common first' },
  { value: '-length', label: 'Longest first' },
  { value: 'length', label: 'Shortest first' },
];
export const SORTING_OPTIONS = [
  { value: '-jingleId', label: 'Newest first' },
  { value: 'jingleId', label: 'Oldest first' },
  { value: '-price', label: 'Most expensive first' },
  { value: 'price', label: 'Cheapest first' },
];

// TODO - change when v0 is added
export const MARKETPLACE_SORTING_OPTIONS = [
  { value: '-jingleId', label: 'Newest first' },
  { value: 'jingleId', label: 'Oldest first' },
  { value: '-price', label: 'Most expensive first' },
  { value: 'price', label: 'Cheapest first' },
];

export const MARKETPLACE_JINGLES_PER_PAGE = 10;

export const PROFILE_TABS = [
  { label: 'Samples', value: 'samples', active: true },
  { label: 'Jingles', value: 'jingles' },
  { label: 'Songs', value: 'songs' },
  { label: 'Albums', value: 'albums' },
];

// App action types
export const INIT_APP = 'init_app';
export const ADD_PENDING_TX = 'add_pending_tx';
export const REMOVE_PENDING_TX = 'remove_pending_tx';

// Marketplace action types
export const CHANGE_MARKETPLACE_PAGE = 'change_marketplace_page';
export const SET_MARKETPLACE_CATEGORY = 'set_marketplace_category';
export const SET_MARKETPLACE_SORT = 'set_marketplace_sort';
export const SET_MARKETPLACE_PAGE = 'set_marketplace_page';
export const MARKETPLACE_LIKE_UNLIKE_JINGLE = 'marketplace_like_unlike_jingle';

export const GET_MARKETPLACE_JINGLES_REQUEST = 'GET_MARKETPLACE_JINGLES_REQUEST';
export const GET_MARKETPLACE_JINGLES_SUCCESS = 'GET_MARKETPLACE_JINGLES_SUCCESS';
export const GET_MARKETPLACE_JINGLES_FAILURE = 'GET_MARKETPLACE_JINGLES_FAILURE';

export const GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST = 'GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST';
export const GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS = 'GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS';
export const GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE = 'GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE';

export const CLEAR_MARKETPLACE_JINGLES_ACTION = 'CLEAR_MARKETPLACE_JINGLES_ACTION';

// Audio action types
export const SET_SINGLE_AUDIO = 'set_single_audio';

// Profile action types
export const SET_ACTIVE_PROFILE_TAB = 'set_active_profile_tab';
export const SET_INVALID_PROFILE = 'set_invalid_profile';
export const SET_PROFILE_SAMPLES = 'set_profile_samples';
export const SET_PROFILE_NUM_SAMPLES_TO_BUY = 'set_profile_num_samples_to_buy';
export const SET_PROFILE_IS_OWNER = 'set_profile_is_owner';
export const SET_PROFILE_JINGLES = 'set_profile_jingles';
export const SET_PROFILE_JINGLES_CATEGORY = 'set_profile_jingles_category';
export const SET_PROFILE_JINGLES_SORT = 'set_profile_jingles_sort';
export const TOGGLE_PROFILE_AUTHOR = 'toggle_profile_author';
export const SET_PROFILE_AUTHOR_EDIT = 'set_profile_author_edit';
export const SET_PENDING_AUTHOR = 'set_pending_author';
export const AUTHOR_EDIT_SUCCESS = 'author_edit_success';
export const SET_MY_JINGLES_PAGE = 'set_my_jingles_page';
export const SET_PROFILE_ADDRESS = 'set_profile_address';
export const SET_MY_SAMPLES_SORTING = 'set_my_samples_sorting';
export const PROFILE_LIKE_UNLIKE_JINGLE = 'profile_like_unlike_jingle';

export const BUY_SAMPLES_REQUEST = 'BUY_SAMPLES_REQUEST';
export const BUY_SAMPLES_SUCCESS = 'BUY_SAMPLES_SUCCESS';
export const BUY_SAMPLES_FAILURE = 'BUY_SAMPLES_FAILURE';
export const CLEAR_BUY_SAMPLES = 'CLEAR_BUY_SAMPLES';

// Compose actions
export const UPDATE_VOLUME = 'update_volume';
export const UPDATE_DELAY = 'update_delay';
export const UPDATE_CUTS = 'update_cuts';

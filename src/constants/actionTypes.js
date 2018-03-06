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
  { value: '-likeCount', label: 'Most loved' },
  { value: '-price', label: 'Most expensive first' },
  { value: 'price', label: 'Cheapest first' },
];
export const MARKETPLACE_JINGLES_PER_PAGE = 12;

export const PROFILE_TABS = [
  { label: 'Samples', value: 'samples', active: true },
  { label: 'Jingles', value: 'jingles' },
  { label: 'Songs', value: 'songs' },
  { label: 'Albums', value: 'albums' },
];

// TODO put everything above this comment in a constants file

// App action types
export const INIT_APP = 'init_app';
export const ADD_PENDING_TX = 'add_pending_tx';
export const REMOVE_PENDING_TX = 'remove_pending_tx';

// Marketplace action types
export const CHANGE_MARKETPLACE_PAGE = 'change_marketplace_page';
export const SET_MARKETPLACE_JINGLES = 'set_marketplace_jingles';
export const SET_MARKETPLACE_CATEGORY = 'set_marketplace_category';
export const SET_MARKETPLACE_SORT = 'set_marketplace_sort';
export const SET_MARKETPLACE_PAGE = 'set_marketplace_page';
export const MARKETPLACE_LIKE_UNLIKE_JINGLE = 'marketplace_like_unlike_jingle';

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

// Compose actions
export const UPDATE_VOLUME = 'update_volume';
export const UPDATE_DELAY = 'update_delay';
export const UPDATE_CUTS = 'update_cuts';
export const SET_COMPOSE_SAMPLES = 'set_compose_samples';
export const SET_COMPOSE_SELECTED_SORT = 'set_compose_selected_sort';
export const HANDLE_SAMPLE_DROP = 'handle_sample_drop';
export const HANDLE_SAMPLE_DROP_CANCEL = 'handle_sample_drop_cancel';
export const TOGGLE_LOADING_NEW_JINGLE = 'toggle_loading_new_jingle';
export const SET_NEW_JINGLE_GROUP = 'set_new_jingle_group';
export const TOGGLE_NEW_JINGLE_PLAYING = 'toggle_new_jingle_playing';
export const SET_NEW_JINGLE_NAME = 'set_new_jingle_name';

// Audio actions
export const ADD_NEW_AUDIO = 'add_new_audio';
export const TOGGLE_PLAY_AUDIO = 'toggle_play_audio';
export const TOGGLE_AUDIO_LOADING = 'toggle_audio_loading';
export const AUDIO_LOADED = 'audio_loaded';

// Jingle Page actions
export const SET_VALID_JINGLE = 'set_valid_jingle';
export const JINGLE_PAGE_LOADED = 'jingle_page_loaded';
export const JINGLE_BOUGHT = 'jingle_bought';
export const JINGLE_SALE_CANCELED = 'jingle_sale_canceled';
export const JINGLE_PUT_ON_SALE = 'jingle_put_on_sale';
export const SET_JINGLE_SELL_PRICE = 'set_jingle_sell_price';
export const LIKE_UNLIKE_JINGLE_PAGE = 'like_unlike_jingle_page';

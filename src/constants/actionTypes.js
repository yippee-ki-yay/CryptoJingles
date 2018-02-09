export const CATEGORY_OPTIONS = [{ value: 'pagination', label: 'All jingles' }, { value: 'sale', label: 'For sale' }];
export const SORTING_OPTIONS = [
  { value: '-jingleId', label: 'Newest first' },
  { value: 'jingleId', label: 'Oldest first' },
  { value: '-price', label: 'Most expensive first' },
  { value: 'price', label: 'Cheapest first' }
];
export const MARKETPLACE_JINGLES_PER_PAGE = 10;

export const PROFILE_TABS = [
  { label: 'Samples', value: 'samples', active: true },
  { label: 'Jingles', value: 'jingles' },
  { label: 'Songs', value: 'songs' },
  { label: 'Albums', value: 'albums' }
];

export const MARKETPLACE_JINNGLES_PER_PAGE = 10;
// TODO put everything above this comment in a constants file

export const CHANGE_MARKETPLACE_PAGE = 'change_marketplace_page';
export const SET_MARKETPLACE_JINGLES = 'set_marketplace_jingles';
export const SET_MARKETPLACE_CATEGORY = 'set_marketplace_category';
export const SET_MARKETPLACE_SORT = 'set_marketplace_sort';
export const SET_MARKETPLACE_PAGE = 'set_marketplace_page';

export const SET_SINGLE_AUDIO = 'set_single_audio';

export const ADD_PENDING_TX = 'add_pending_tx';
export const REMOVE_PENDING_TX = 'remove_pending_tx';

export const SET_ACTIVE_PROFILE_TAB = 'set_active_profile_tab';
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
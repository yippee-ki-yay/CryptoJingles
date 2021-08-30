import en from './en.json';

const languages = {
  en,
  getLanguage: (code) => import(
    /* webpackInclude: /\.json$/ */
    /* webpackExclude: /\.noimport\.json$/ */
    /* webpackChunkName: "languages" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    `./${code}.json`),
};

export default languages;

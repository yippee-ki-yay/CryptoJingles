import React from 'react';
import { FormattedMessage as IntlFormattedMessage } from 'react-intl';
import en from './en.json';
import langManager from './lang-manager';

const HTML_REGEX = /<\/?[\w\s="/.':;#-/]+>/i;

/**
 * Takes a missing translation id and transforms it to a readable format
 * e.g. Common.read_more_here -> Read more here
 *
 * @param id {String}
 * @return {string}
 */
const fallbackDefaultMessage = (id) => {
  const withoutDots = id.substring(id.lastIndexOf('.') + 1, id.length);
  const withoutUnderscore = withoutDots.replace(/_/g, ' ');
  return withoutUnderscore.charAt(0).toUpperCase() + withoutUnderscore.slice(1);
};

const translate = (idParam, values, tagName) => {
  let id = idParam;
  let defaultMessage = en[id];
  if (!id) {
    id = 'empty-id';
    defaultMessage = '';
  } else if (id && !defaultMessage) defaultMessage = fallbackDefaultMessage(id);
  const defaultMessageHasHtml = HTML_REGEX.test(defaultMessage);
  // Return JSX element
  // The default html element values for this is in index.js
  if (tagName || defaultMessageHasHtml) {
    const propsForIntlFormattedMessage = { id, defaultMessage };
    if (values) propsForIntlFormattedMessage.values = values;
    if (tagName) propsForIntlFormattedMessage.tagName = tagName;

    // The spread is used to skip the react-intl static analysis syntax
    // because that functionality is replaced and extended by our scripts
    // that check translation files and translation ids usage in components
    return (
      <IntlFormattedMessage {...propsForIntlFormattedMessage} />
    );
  }
  // Returns just strings
  return langManager.intl.formatMessage({ id, defaultMessage }, values);
};

export default (id, values, tagName) => translate(id, values, tagName);

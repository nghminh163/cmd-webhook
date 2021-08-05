import _ from 'lodash';
export const isNumberic = (s: any) => {
  s = parseInt(s + '');
  return _.isNumber(s) && !_.isNaN(s);
};

export const forceParseNumber = (s: any, parseToUndefined?: boolean) => {
  // if s not number -> parse to undefined or zero
  if (isNumberic(s)) {
    return parseInt(s + '');
  } else if (parseToUndefined) {
    return undefined;
  }
  return 0;
};

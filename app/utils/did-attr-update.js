import _isEqual from 'lodash/lang/isEqual';

export function didAttrUpdate(attrs, attrName) {
  let oldAttr = null;
  let newAttr = null;

  if (attrs.oldAttrs.hasOwnProperty(attrName)) {
    oldAttr = attrs.oldAttrs[attrName].value;
  }

  if (attrs.newAttrs.hasOwnProperty(attrName)) {
    newAttr = attrs.newAttrs[attrName].value;
  }

  return !_isEqual(newAttr, oldAttr);
}
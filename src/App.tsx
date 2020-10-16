import React, { useState } from 'react';
import './App.css';
import RuleGroup from './rule-group';
import {
  get, set, unset,
  forOwn, isUndefined,
  isNull, isNaN,
  isString, isEmpty, isObject, isArray, pull, cloneDeep
} from 'lodash';

const initialData = {
  and: [
    { field: 'fname', op: 'is', value: 'sas'},
    { field: 'fname', op: 'less', value: 'bob'},
    { or: [
      { field: 'fname', op: 'not-is', value: 'bob'},
      { field: 'fname', op: 'greater', value: 'bob'},
      { field: 'fname', op: 'greater', value: 'bob'},
    ]}
  ]
}

const pruneEmpty = (obj: any) => {
  return function prune(current) {
    forOwn(current, function (value, key) {
      if (isNull(value) 
      || isNaN(value) ||
        (isString(value) && isEmpty(value)) ||
        (isObject(value) && isEmpty(prune(value)))
        ) {

        delete current[key];
      }
    });
    // remove any leftover undefined values from the delete 
    // operation on an array
    if (isArray(current)) pull(current, undefined);

    return current;

  }(cloneDeep(obj));  // Do not modify the original object, create a clone instead
}

function App() {
  const [data, setData] = useState(initialData);

  const changeKey = (path: string, prevKey: string, newKey: string) => {
    const culprit = path ? get(data, path, {}): data;
    culprit[newKey] = culprit[prevKey];
    delete culprit[prevKey];
    setData({ ...data });
  }

  const upsert = (path: string, obj: any, isSet: boolean) => {
    let mPath = path.startsWith('.') ? path.slice(1) : path;
    let mData = cloneDeep(data);
    if (isSet) {
      set(mData, mPath, obj);
    } else {
      unset(mData, mPath);
      mData = pruneEmpty(mData);
    }
    setData(mData);
  }

  return (
    <div className="App">
      <RuleGroup
        data={data}
        level={1}
        action={upsert}
        onConditionChange={changeKey}
        path=""
        />
        <br />
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;

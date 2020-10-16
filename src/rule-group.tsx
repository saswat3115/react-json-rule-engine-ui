/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { colorLuminance } from "./rgb";
import Rule from "./rule";
import { IRule } from "./type";

const BASE_SHADE = "F7F7F7";
const EMPTY_RULE: IRule = {
  field: '',
  op: '',
  value: '',
};

const RuleGroup = ({ data, level, path, action, onConditionChange }: any) => {
  const condition = Object.keys(data)[0];
  const rules = data[condition];

  return (
    <li className={level > 1 ? 'rule' : ''}>
      <ul
        style={{
          backgroundColor: colorLuminance(
            BASE_SHADE,
            parseInt(level, 10)
          )
        }}
      >
        <li>
          <a href="#">
            <div className="add-rule-options">
                <select
                  value={condition}
                  onChange={(e: any) => onConditionChange(path, condition, e.target.value)}
                >
                    <option value="and">And</option>
                    <option value="or">Or</option>
                </select>
                <button onClick={() => action(`${path}.${condition}[${rules.length}]`, EMPTY_RULE, true)}>+ rule</button>
                <button onClick={() => action(`${path}.${condition}[${rules.length}]`, { and: [EMPTY_RULE]}, true)}>+ rule group</button>
                <button
                  onClick={() => action(path, '', false)}>
                  delete
                </button>
            </div>
          </a>
          <ul>
            {rules.map((r: any, i: number) => {
                const childCondition = Object.keys(r)[0];
                let pathindex = path ? `${path}.${condition}[${i}]` : `${condition}[${i}]`;
                return (['and', 'or'].includes(childCondition)) ? (
                  <RuleGroup
                    data={r}
                    key={i}
                    path={pathindex}
                    action={action}
                    onConditionChange={onConditionChange}
                    level={level + 1}
                  />
                ) : (
                  <Rule
                    rule={r}
                    key={i}
                    path={pathindex}
                    onParamChange={action}
                  />
                );
              })}
          </ul>
        </li>
      </ul>
    </li>
  );
}

export default RuleGroup;
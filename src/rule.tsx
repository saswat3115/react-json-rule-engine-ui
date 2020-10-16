import React from "react";
import { IRule } from "./type";

type Props = {
  rule: IRule;
  path: string;
  onParamChange: (path: string, data: string, isUpdate: boolean) => void;  
}

const Rule = ({ path, rule, onParamChange }: Props) => (
  <li className="rule">
   <div className="rule-body">
        <input
            value={rule.field}
            onChange={(e: any) => onParamChange(`${path}.field`, e.target.value, true)}
        />
        <select
            value={rule.op}
            onChange={(e: any) => onParamChange(`${path}.op`, e.target.value, true)}
        >
            <option value="is">is</option>
            <option value="not-is">not is</option>
            <option value="greater">greater</option>
            <option value="less">less</option>
            <option value="has">has</option>
            <option value="contains">contains</option>
        </select>
        <input
            value={rule.value}
            onChange={(e: any) => onParamChange(`${path}.value`, e.target.value, true)}
        />
        <button onClick={() => onParamChange(path, '', false)}>X</button>
    </div>
  </li>
);

export default Rule;

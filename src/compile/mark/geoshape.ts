import {UnitModel} from '../unit';
import * as mixins from './mixins';

import {Config} from '../../config';
import {Field, FieldDef, isFieldDef} from '../../fielddef';
import {VgGeoShapeTransform, VgPostEncodingTransform} from '../../vega.schema';
import {getMarkConfig} from '../common';
import {MarkCompiler} from './base';

export const geoshape: MarkCompiler = {
  vgMark: 'shape',
  defaultRole: 'geoshape',
  encodeEntry: (model: UnitModel) => {
    const {config} = model;
    return {
      ...mixins.color(model),
      ...mixins.nonPosition('opacity', model),
      ...mixins.nonPosition('shape', model, {defaultValue: getMarkConfig('shape', 'geoshape', config) as string})
    };
  },
  postEncodingTransform: (model: UnitModel): VgGeoShapeTransform[] => {
    const {encoding} = model;
    const field: FieldDef<Field> = encoding.shape && isFieldDef(encoding.shape) ? encoding.shape.field : undefined;
    return [{
      type: 'geoshape',
      projection: model.getName('projection'),
      as: 'shape',
      ...field ? {field: field} : {},
    } as VgGeoShapeTransform];
  }
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../../log");
var channel_1 = require("../../channel");
var datetime_1 = require("../../datetime");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
function format(specifiedAxis, channel, fieldDef, config) {
    return common_1.numberFormat(fieldDef, specifiedAxis.format, config, channel);
}
exports.format = format;
// TODO: we need to refactor this method after we take care of config refactoring
/**
 * Default rules for whether to show a grid should be shown for a channel.
 * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
 */
function gridShow(model, channel) {
    var grid = model.axis(channel).grid;
    if (grid !== undefined) {
        return grid;
    }
    return !model.hasDiscreteDomain(channel) && !model.fieldDef(channel).bin;
}
exports.gridShow = gridShow;
function grid(model, channel, isGridAxis) {
    if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
        // never apply grid for ROW and COLUMN since we manually create rule-group for them
        return false;
    }
    if (!isGridAxis) {
        return undefined;
    }
    return gridShow(model, channel);
}
exports.grid = grid;
function gridScale(model, channel, isGridAxis) {
    if (isGridAxis) {
        var gridChannel = channel === 'x' ? 'y' : 'x';
        if (model.scale(gridChannel)) {
            return model.scaleName(gridChannel);
        }
    }
    return undefined;
}
exports.gridScale = gridScale;
function orient(specifiedAxis, channel) {
    var orient = specifiedAxis.orient;
    if (orient) {
        return orient;
    }
    switch (channel) {
        case channel_1.COLUMN:
            // FIXME test and decide
            return 'top';
        case channel_1.X:
            return 'bottom';
        case channel_1.ROW:
        case channel_1.Y:
            return 'left';
    }
    /* istanbul ignore next: This should never happen. */
    throw new Error(log.message.INVALID_CHANNEL_FOR_AXIS);
}
exports.orient = orient;
function tickCount(specifiedAxis, channel, fieldDef) {
    var count = specifiedAxis.tickCount;
    if (count !== undefined) {
        return count;
    }
    // FIXME depends on scale type too
    if (channel === channel_1.X && !fieldDef.bin) {
        // Vega's default tickCount often lead to a lot of label occlusion on X without 90 degree rotation
        return 5;
    }
    return undefined;
}
exports.tickCount = tickCount;
function title(specifiedAxis, fieldDef, config, isGridAxis) {
    if (isGridAxis) {
        return undefined;
    }
    if (specifiedAxis.title === '') {
        return undefined;
    }
    if (specifiedAxis.title !== undefined) {
        return specifiedAxis.title;
    }
    // if not defined, automatically determine axis title from field def
    var fieldTitle = fielddef_1.title(fieldDef, config);
    var maxLength = specifiedAxis.titleMaxLength;
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
function values(specifiedAxis) {
    var vals = specifiedAxis.values;
    if (specifiedAxis.values && datetime_1.isDateTime(vals[0])) {
        return vals.map(function (dt) {
            // normalize = true as end user won't put 0 = January
            return { signal: datetime_1.dateTimeExpr(dt, true) };
        });
    }
    return vals;
}
exports.values = values;
function zindex(specifiedAxis, isGridAxis) {
    var z = specifiedAxis.zindex;
    if (z !== undefined) {
        return z;
    }
    if (isGridAxis) {
        // if grid is true, need to put layer on the back so that grid is behind marks
        return 0;
    }
    return 1; // otherwise return undefined and use Vega's default.
}
exports.zindex = zindex;
function domainAndTicks(property, specifiedAxis, isGridAxis, channel) {
    if (isGridAxis || channel === channel_1.ROW || channel === channel_1.COLUMN) {
        return false;
    }
    return specifiedAxis[property];
}
exports.domainAndTicks = domainAndTicks;
exports.domain = domainAndTicks;
exports.ticks = domainAndTicks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcGlsZS9heGlzL3J1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlDO0FBR2pDLHlDQUF5RDtBQUV6RCwyQ0FBa0U7QUFDbEUsMkNBQWdFO0FBQ2hFLG1DQUFvQztBQUdwQyxvQ0FBdUM7QUFHdkMsZ0JBQXVCLGFBQW1CLEVBQUUsT0FBZ0IsRUFBRSxRQUEwQixFQUFFLE1BQWM7SUFDdEcsTUFBTSxDQUFDLHFCQUFZLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFGRCx3QkFFQztBQUVELGlGQUFpRjtBQUNqRjs7O0dBR0c7QUFDSCxrQkFBeUIsS0FBZ0IsRUFBRSxPQUFnQjtJQUN6RCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzNFLENBQUM7QUFQRCw0QkFPQztBQUVELGNBQXFCLEtBQWdCLEVBQUUsT0FBZ0IsRUFBRSxVQUFtQjtJQUMxRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssYUFBRyxJQUFJLE9BQU8sS0FBSyxnQkFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxtRkFBbUY7UUFDbkYsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFD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
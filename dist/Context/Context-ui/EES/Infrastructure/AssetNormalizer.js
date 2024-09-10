"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssetNormalizer {
    normalize(value, asset) {
        return parseInt(value) / Math.pow(10, asset.get("precision"));
    }
    denormalize(value, asset) {
        return (value * Math.pow(10, asset.get("precision"))).toString();
    }
}
exports.default = AssetNormalizer;
//# sourceMappingURL=AssetNormalizer.js.map
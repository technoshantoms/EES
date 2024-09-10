"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssetNormalizer_1 = __importDefault(require("../../../Context/Infrastructure/AssetNormalizer"));
const chai_1 = require("chai");
describe('AssetNormalizer', () => {
    describe('success', () => {
        const converter = new AssetNormalizer_1.default();
        const asset = {
            get: (name) => {
                if (name == "precision") {
                    return 18;
                }
                return null;
            }
        };
        it('should normalize 1000000000000000000 ETHWei to 1 ETH', () => {
            (0, chai_1.expect)(converter.normalize('1000000000000000000', asset)).equals(1);
        });
        it('should denormalize 1 ETH to 1000000000000000000 ETHWei', () => {
            (0, chai_1.expect)(converter.denormalize(1, asset)).equals('1000000000000000000');
        });
    });
});
//# sourceMappingURL=AssetNormalizer.js.map
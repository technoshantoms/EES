"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_commander_1 = require("nest-commander");
const CliModule_1 = require("./Context/Application/Cli/CliModule");
async function bootstrap() {
    await nest_commander_1.CommandFactory.run(CliModule_1.CliModule, ['warn', 'error']);
}
bootstrap();
//# sourceMappingURL=cli.js.map
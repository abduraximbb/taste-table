"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSchema = exports.Restaurant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Restaurant = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ versionKey: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _phone_number_decorators;
    let _phone_number_initializers = [];
    let _phone_number_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _tables_decorators;
    let _tables_initializers = [];
    let _tables_extraInitializers = [];
    let _managers_decorators;
    let _managers_initializers = [];
    let _managers_extraInitializers = [];
    var Restaurant = _classThis = class {
        constructor() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.phone_number = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _phone_number_initializers, void 0));
            this.description = (__runInitializers(this, _phone_number_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.tables = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _tables_initializers, void 0));
            this.managers = (__runInitializers(this, _tables_extraInitializers), __runInitializers(this, _managers_initializers, void 0));
            __runInitializers(this, _managers_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Restaurant");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, mongoose_1.Prop)()];
        _phone_number_decorators = [(0, mongoose_1.Prop)()];
        _description_decorators = [(0, mongoose_1.Prop)()];
        _tables_decorators = [(0, mongoose_1.Prop)({
                type: [
                    {
                        type: mongoose_2.default.Schema.Types.ObjectId,
                        ref: 'Table',
                    },
                ],
            })];
        _managers_decorators = [(0, mongoose_1.Prop)({
                type: [
                    {
                        type: mongoose_2.default.Schema.Types.ObjectId,
                        ref: 'Managers',
                    },
                ],
            })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _phone_number_decorators, { kind: "field", name: "phone_number", static: false, private: false, access: { has: obj => "phone_number" in obj, get: obj => obj.phone_number, set: (obj, value) => { obj.phone_number = value; } }, metadata: _metadata }, _phone_number_initializers, _phone_number_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _tables_decorators, { kind: "field", name: "tables", static: false, private: false, access: { has: obj => "tables" in obj, get: obj => obj.tables, set: (obj, value) => { obj.tables = value; } }, metadata: _metadata }, _tables_initializers, _tables_extraInitializers);
        __esDecorate(null, null, _managers_decorators, { kind: "field", name: "managers", static: false, private: false, access: { has: obj => "managers" in obj, get: obj => obj.managers, set: (obj, value) => { obj.managers = value; } }, metadata: _metadata }, _managers_initializers, _managers_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Restaurant = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Restaurant = _classThis;
})();
exports.Restaurant = Restaurant;
exports.RestaurantSchema = mongoose_1.SchemaFactory.createForClass(Restaurant);

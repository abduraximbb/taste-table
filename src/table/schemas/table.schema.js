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
exports.TableSchema = exports.Table = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Table = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ versionKey: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _number_decorators;
    let _number_initializers = [];
    let _number_extraInitializers = [];
    let _amount_decorators;
    let _amount_initializers = [];
    let _amount_extraInitializers = [];
    let _qr_code_decorators;
    let _qr_code_initializers = [];
    let _qr_code_extraInitializers = [];
    let _restaurant_id_decorators;
    let _restaurant_id_initializers = [];
    let _restaurant_id_extraInitializers = [];
    var Table = _classThis = class {
        constructor() {
            this.number = __runInitializers(this, _number_initializers, void 0);
            this.amount = (__runInitializers(this, _number_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.qr_code = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _qr_code_initializers, void 0));
            this.restaurant_id = (__runInitializers(this, _qr_code_extraInitializers), __runInitializers(this, _restaurant_id_initializers, void 0));
            __runInitializers(this, _restaurant_id_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Table");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _number_decorators = [(0, mongoose_1.Prop)()];
        _amount_decorators = [(0, mongoose_1.Prop)()];
        _qr_code_decorators = [(0, mongoose_1.Prop)()];
        _restaurant_id_decorators = [(0, mongoose_1.Prop)({
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'Restaurant',
            })];
        __esDecorate(null, null, _number_decorators, { kind: "field", name: "number", static: false, private: false, access: { has: obj => "number" in obj, get: obj => obj.number, set: (obj, value) => { obj.number = value; } }, metadata: _metadata }, _number_initializers, _number_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: obj => "amount" in obj, get: obj => obj.amount, set: (obj, value) => { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _qr_code_decorators, { kind: "field", name: "qr_code", static: false, private: false, access: { has: obj => "qr_code" in obj, get: obj => obj.qr_code, set: (obj, value) => { obj.qr_code = value; } }, metadata: _metadata }, _qr_code_initializers, _qr_code_extraInitializers);
        __esDecorate(null, null, _restaurant_id_decorators, { kind: "field", name: "restaurant_id", static: false, private: false, access: { has: obj => "restaurant_id" in obj, get: obj => obj.restaurant_id, set: (obj, value) => { obj.restaurant_id = value; } }, metadata: _metadata }, _restaurant_id_initializers, _restaurant_id_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Table = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Table = _classThis;
})();
exports.Table = Table;
exports.TableSchema = mongoose_1.SchemaFactory.createForClass(Table);

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
exports.ManagersSchema = exports.Managers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Managers = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ versionKey: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _hashed_password_decorators;
    let _hashed_password_initializers = [];
    let _hashed_password_extraInitializers = [];
    let _restaurant_id_decorators;
    let _restaurant_id_initializers = [];
    let _restaurant_id_extraInitializers = [];
    let _is_active_decorators;
    let _is_active_initializers = [];
    let _is_active_extraInitializers = [];
    let _tg_link_decorators;
    let _tg_link_initializers = [];
    let _tg_link_extraInitializers = [];
    let _hashed_refresh_token_decorators;
    let _hashed_refresh_token_initializers = [];
    let _hashed_refresh_token_extraInitializers = [];
    var Managers = _classThis = class {
        constructor() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.hashed_password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _hashed_password_initializers, void 0));
            this.restaurant_id = (__runInitializers(this, _hashed_password_extraInitializers), __runInitializers(this, _restaurant_id_initializers, void 0));
            this.is_active = (__runInitializers(this, _restaurant_id_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
            this.tg_link = (__runInitializers(this, _is_active_extraInitializers), __runInitializers(this, _tg_link_initializers, void 0));
            this.hashed_refresh_token = (__runInitializers(this, _tg_link_extraInitializers), __runInitializers(this, _hashed_refresh_token_initializers, void 0));
            __runInitializers(this, _hashed_refresh_token_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Managers");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, mongoose_1.Prop)()];
        _email_decorators = [(0, mongoose_1.Prop)({ unique: true })];
        _hashed_password_decorators = [(0, mongoose_1.Prop)()];
        _restaurant_id_decorators = [(0, mongoose_1.Prop)({
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'Restaurant',
            })];
        _is_active_decorators = [(0, mongoose_1.Prop)({ default: true })];
        _tg_link_decorators = [(0, mongoose_1.Prop)()];
        _hashed_refresh_token_decorators = [(0, mongoose_1.Prop)()];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _hashed_password_decorators, { kind: "field", name: "hashed_password", static: false, private: false, access: { has: obj => "hashed_password" in obj, get: obj => obj.hashed_password, set: (obj, value) => { obj.hashed_password = value; } }, metadata: _metadata }, _hashed_password_initializers, _hashed_password_extraInitializers);
        __esDecorate(null, null, _restaurant_id_decorators, { kind: "field", name: "restaurant_id", static: false, private: false, access: { has: obj => "restaurant_id" in obj, get: obj => obj.restaurant_id, set: (obj, value) => { obj.restaurant_id = value; } }, metadata: _metadata }, _restaurant_id_initializers, _restaurant_id_extraInitializers);
        __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: obj => "is_active" in obj, get: obj => obj.is_active, set: (obj, value) => { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
        __esDecorate(null, null, _tg_link_decorators, { kind: "field", name: "tg_link", static: false, private: false, access: { has: obj => "tg_link" in obj, get: obj => obj.tg_link, set: (obj, value) => { obj.tg_link = value; } }, metadata: _metadata }, _tg_link_initializers, _tg_link_extraInitializers);
        __esDecorate(null, null, _hashed_refresh_token_decorators, { kind: "field", name: "hashed_refresh_token", static: false, private: false, access: { has: obj => "hashed_refresh_token" in obj, get: obj => obj.hashed_refresh_token, set: (obj, value) => { obj.hashed_refresh_token = value; } }, metadata: _metadata }, _hashed_refresh_token_initializers, _hashed_refresh_token_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Managers = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Managers = _classThis;
})();
exports.Managers = Managers;
exports.ManagersSchema = mongoose_1.SchemaFactory.createForClass(Managers);

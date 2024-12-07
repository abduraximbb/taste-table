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
exports.MenuSchema = exports.Menu = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Menu = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ versionKey: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _food_categories_id_decorators;
    let _food_categories_id_initializers = [];
    let _food_categories_id_extraInitializers = [];
    let _restaurant_id_decorators;
    let _restaurant_id_initializers = [];
    let _restaurant_id_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _price_decorators;
    let _price_initializers = [];
    let _price_extraInitializers = [];
    let _image_url_decorators;
    let _image_url_initializers = [];
    let _image_url_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    var Menu = _classThis = class {
        constructor() {
            this.food_categories_id = __runInitializers(this, _food_categories_id_initializers, void 0);
            this.restaurant_id = (__runInitializers(this, _food_categories_id_extraInitializers), __runInitializers(this, _restaurant_id_initializers, void 0));
            this.description = (__runInitializers(this, _restaurant_id_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.image_url = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _image_url_initializers, void 0));
            this.status = (__runInitializers(this, _image_url_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Menu");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _food_categories_id_decorators = [(0, mongoose_1.Prop)({
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'Food_categories',
            })];
        _restaurant_id_decorators = [(0, mongoose_1.Prop)({
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'Restaurant',
            })];
        _description_decorators = [(0, mongoose_1.Prop)()];
        _price_decorators = [(0, mongoose_1.Prop)()];
        _image_url_decorators = [(0, mongoose_1.Prop)()];
        _status_decorators = [(0, mongoose_1.Prop)()];
        __esDecorate(null, null, _food_categories_id_decorators, { kind: "field", name: "food_categories_id", static: false, private: false, access: { has: obj => "food_categories_id" in obj, get: obj => obj.food_categories_id, set: (obj, value) => { obj.food_categories_id = value; } }, metadata: _metadata }, _food_categories_id_initializers, _food_categories_id_extraInitializers);
        __esDecorate(null, null, _restaurant_id_decorators, { kind: "field", name: "restaurant_id", static: false, private: false, access: { has: obj => "restaurant_id" in obj, get: obj => obj.restaurant_id, set: (obj, value) => { obj.restaurant_id = value; } }, metadata: _metadata }, _restaurant_id_initializers, _restaurant_id_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: obj => "price" in obj, get: obj => obj.price, set: (obj, value) => { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _image_url_decorators, { kind: "field", name: "image_url", static: false, private: false, access: { has: obj => "image_url" in obj, get: obj => obj.image_url, set: (obj, value) => { obj.image_url = value; } }, metadata: _metadata }, _image_url_initializers, _image_url_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Menu = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Menu = _classThis;
})();
exports.Menu = Menu;
exports.MenuSchema = mongoose_1.SchemaFactory.createForClass(Menu);

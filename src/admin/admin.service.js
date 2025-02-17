"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let AdminService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AdminService = _classThis = class {
        constructor(adminModel, jwtService) {
            this.adminModel = adminModel;
            this.jwtService = jwtService;
        }
        generateTokens(admin) {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = {
                    id: admin._id,
                    is_active: admin.is_active,
                    is_creator: admin.is_creator,
                };
                const [access_token, refresh_token] = yield Promise.all([
                    this.jwtService.signAsync(payload, {
                        secret: process.env.ACCESS_TOKEN_KEY,
                        expiresIn: process.env.ACCESS_TOKEN_TIME,
                    }),
                    this.jwtService.signAsync(payload, {
                        secret: process.env.REFRESH_TOKEN_KEY,
                        expiresIn: process.env.REFRESH_TOKEN_TIME,
                    }),
                ]);
                return {
                    access_token,
                    refresh_token,
                };
            });
        }
        create(createAdminDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const { password, confirm_password } = createAdminDto;
                if (password !== confirm_password) {
                    throw new common_1.BadRequestException('Parollar mos emas');
                }
                const hashed_password = yield bcrypt.hash(password, 7);
                const newAdmin = yield this.adminModel.create(Object.assign(Object.assign({}, createAdminDto), { hashed_password }));
                const tokens = yield this.generateTokens(newAdmin);
                const hashed_refresh_token = yield bcrypt.hash(tokens.refresh_token, 7);
                newAdmin.hashed_refresh_token = hashed_refresh_token;
                yield newAdmin.save();
                return {
                    message: "Admin success created",
                    id: newAdmin._id,
                    access_token: tokens.access_token,
                };
            });
        }
        findAll() {
            return this.adminModel.find();
        }
        findOne(id) {
            return this.adminModel.findById(id);
        }
        update(id, updateAdminDto) {
            return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true });
        }
        remove(id) {
            return this.adminModel.findByIdAndDelete(id);
            // return this.adminModel.deleteOne({_id:id})
        }
    };
    __setFunctionName(_classThis, "AdminService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
})();
exports.AdminService = AdminService;

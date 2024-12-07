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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let ClientsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ClientsService = _classThis = class {
        constructor(clientModel, jwtService) {
            this.clientModel = clientModel;
            this.jwtService = jwtService;
        }
        generateTokens(client) {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = {
                    id: client._id,
                    name: client.name,
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
        create(createClientDto, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { password, confirm_password } = createClientDto;
                const exists_email = this.clientModel.findOne({
                    email: createClientDto.email,
                });
                // if (exists_email) {
                //   throw new BadRequestException('This email already exists');
                // }
                if (password !== confirm_password) {
                    throw new common_1.BadRequestException('Passwords do not match');
                }
                const hashed_password = yield bcrypt.hash(password, 7);
                const newClient = yield this.clientModel.create(Object.assign(Object.assign({}, createClientDto), { hashed_password }));
                const tokens = yield this.generateTokens(newClient);
                const hashed_refresh_token = yield bcrypt.hash(tokens.refresh_token, 7);
                newClient.hashed_refresh_token = hashed_refresh_token;
                yield newClient.save();
                res.cookie('refresh_token', tokens.refresh_token, {
                    httpOnly: true,
                    maxAge: +process.env.REFRESH_TIME_MS,
                });
                return {
                    message: 'Client addedd success',
                    id: newClient._id,
                    accessToken: tokens.access_token,
                };
            });
        }
        signIn(signInDto, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const client = yield this.clientModel.findOne({
                    email: signInDto.email,
                });
                if (!client) {
                    throw new common_1.UnauthorizedException('Client not found');
                }
                const validPassword = yield bcrypt.compare(signInDto.password, client.hashed_password);
                if (!validPassword) {
                    throw new common_1.UnauthorizedException('Client not found');
                }
                const tokens = yield this.generateTokens(client);
                const hashed_refresh_token = yield bcrypt.hash(tokens.refresh_token, 7);
                const updatedClient = yield this.clientModel.findByIdAndUpdate(client._id, { hashed_refresh_token }, { new: true });
                res.cookie('refresh_token', tokens.refresh_token, {
                    httpOnly: true,
                    maxAge: +process.env.REFRESH_TIME_MS,
                });
                return {
                    message: 'Client signed in success',
                    id: client._id,
                    accessToken: tokens.access_token,
                };
            });
        }
        signOut(refreshToken, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = yield this.jwtService.verifyAsync(refreshToken, {
                    secret: process.env.REFRESH_TOKEN_KEY,
                });
                const client = yield this.clientModel.findOne({ _id: payload.id });
                if (!client) {
                    throw new common_1.BadRequestException('Client topilmadi');
                }
                yield this.clientModel.findByIdAndUpdate(client._id, {
                    hashed_refresh_token: null,
                });
                res.clearCookie('refresh_token');
                return {
                    message: 'Client success logouted',
                };
            });
        }
        refreshToken(refreshToken, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const payload = yield this.jwtService.verifyAsync(refreshToken, {
                        secret: process.env.REFRESH_TOKEN_KEY,
                    });
                    const manager = yield this.clientModel.findById(payload.id);
                    if (!manager) {
                        throw new common_1.UnauthorizedException('Client topilmadi');
                    }
                    const valid_refresh_token = yield bcrypt.compare(refreshToken, manager.hashed_refresh_token);
                    if (!valid_refresh_token) {
                        throw new common_1.UnauthorizedException("So'rovda xatolik");
                    }
                    const tokens = yield this.generateTokens(manager);
                    const hashed_refresh_token = yield bcrypt.hash(tokens.refresh_token, 7);
                    yield this.clientModel.findByIdAndUpdate(manager._id, { hashed_refresh_token }, { new: true });
                    res.cookie('refresh_token', tokens.refresh_token, {
                        httpOnly: true,
                        maxAge: +process.env.REFRESH_TIME_MS,
                    });
                    return {
                        access_token: tokens.access_token,
                    };
                }
                catch (error) {
                    throw new common_1.BadRequestException('Expired token');
                }
            });
        }
        findAll() {
            return this.clientModel.find();
        }
        findOne(id) {
            return this.clientModel.findById(id);
        }
        update(id, updateClientDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const client = yield this.clientModel.findById(id);
                const exists_email = this.clientModel.findOne({
                    email: client.email,
                });
                // if (exists_email && client.email !== updateClientDto.email) {
                //   throw new BadRequestException('This email already exists');
                // }
                return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
                    new: true,
                });
            });
        }
        remove(id) {
            return this.clientModel.findByIdAndDelete(id);
        }
    };
    __setFunctionName(_classThis, "ClientsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ClientsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ClientsService = _classThis;
})();
exports.ClientsService = ClientsService;

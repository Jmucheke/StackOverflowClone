"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const footer_component_1 = require("../shared/footer/footer.component");
const router_1 = require("@angular/router");
let QuestionsComponent = class QuestionsComponent {
};
QuestionsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-questions',
        standalone: true,
        imports: [common_1.CommonModule, footer_component_1.FooterComponent, router_1.RouterModule],
        templateUrl: './questions.component.html',
        styleUrls: ['./questions.component.css']
    })
], QuestionsComponent);
exports.QuestionsComponent = QuestionsComponent;

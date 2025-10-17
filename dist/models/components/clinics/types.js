"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipStatus = exports.PMSSystem = exports.LocationType = void 0;
var LocationType;
(function (LocationType) {
    LocationType["Single"] = "single";
    LocationType["Multi"] = "multi";
})(LocationType || (exports.LocationType = LocationType = {}));
var PMSSystem;
(function (PMSSystem) {
    PMSSystem["Dentrix"] = "dentrix";
    PMSSystem["Eaglesoft"] = "eaglesoft";
    PMSSystem["OpenDental"] = "open_dental";
})(PMSSystem || (exports.PMSSystem = PMSSystem = {}));
var MembershipStatus;
(function (MembershipStatus) {
    MembershipStatus["Active"] = "active";
    MembershipStatus["Inactive"] = "inactive";
    MembershipStatus["Pending"] = "pending";
    MembershipStatus["Suspended"] = "suspended";
})(MembershipStatus || (exports.MembershipStatus = MembershipStatus = {}));

export namespace Relay {
  export interface SearchResponse {
    searchAuditId: string;
    workOpportunities: WorkOpportunity[];
    carrierDetails: CarrierDetails;
    nextItemToken: number;
    totalResultsSize: number;
    isBotRequest: null;
    responseMetadata: string;
  }

  export interface CarrierDetails {
    carrierPerformanceScore: number;
    carrierEngagementScore: number;
    carrierPerformanceCategory: string;
    carrierEngagementCategory: CarrierEngagementCategory;
    priorityAccessVersion: string;
    isCarrierEligibleForOneDayPayment: boolean;
    isCarrierAllowedForOneDayPayment: boolean;
    isCarrierEligibleForOptInOneDayPayment: boolean;
    isCarrierWhiteListedForOneDayPayment: boolean;
  }

  export enum CarrierEngagementCategory {
    DeliveryStation = 'DELIVERY_STATION',
    IbXdock = 'IB_XDOCK',
    NonSort = 'NON_SORT',
    ReturnCenter = 'RETURN_CENTER',
    SortCenter = 'SORT_CENTER',
    Sortable = 'SORTABLE',
    Unknown = 'UNKNOWN',
    Vendor = 'VENDOR',
  }

  export interface WorkOpportunity {
    id: string;
    version: number;
    majorVersion: number;
    entityType: null;
    operatorIds: null;
    startTime: null;
    endTime: null;
    expirationTime: null;
    expectedArrivalForNextStop: null;
    stopCount: number;
    isRetendered: null;
    isUnaccepted: null;
    businessType: null;
    contractId: null;
    payout: Deadhead;
    transitOperatorType: TransitOperatorType;
    totalDuration: number;
    totalLayover: number;
    tourState: TourState;
    firstPickupTime: string;
    lastDeliveryTime: string;
    totalDistance: Deadhead;
    loads: Load[];
    aggregatedCostItems: CostItem[];
    workType: WorkType;
    workOpportunityOptionId: string;
    workOpportunityType: WorkOpportunityType;
    deadhead: Deadhead;
    createdAtTime: string;
    endPriorityTime: null;
    relevanceScore: number;
    carrierSpecificShipperAccounts: CarrierSpecificShipperAccounts;
    startLocation: Location;
    endLocation: Location;
    powerType: null;
    shouldShowPriorityBadge: boolean;
    workOpportunityArrivalWindows: any[];
    matchDeviationDetails: null;
    eligibleFeatures: any[];
    carrierIneligibleForWOReasonList: any[];
    carrierIneligibleForWOContextMap: CarrierIneligibleForWOContextMap;
    nationality: null;
    searchChannelStampedDuration: SearchChannelStampedDuration;
    tags: string[];
    demandSupportEnabled: boolean;
    laportLoad: boolean;
    chassisDepotLoad: boolean;
    oneDayPaymentEligible: boolean;
    adHocLoad: boolean;
  }

  export interface CostItem {
    name: Name;
    monetaryAmount: Deadhead;
  }

  export interface Deadhead {
    value: number;
    unit: Unit;
  }

  export enum Unit {
    Grams = 'grams',
    Miles = 'miles',
    Pounds = 'pounds',
    Usd = 'USD',
  }

  export enum Name {
    BaseRate = 'Base Rate',
    FuelSurcharge = 'Fuel Surcharge',
    TollCharge = 'Toll Charge',
  }

  export interface CarrierIneligibleForWOContextMap {}

  export interface CarrierSpecificShipperAccounts {
    AF_Or_IB: boolean;
    VAS: boolean;
    DELAYED_DELIVERY: boolean;
    GLOBAL_MILE: boolean;
    SWA: boolean;
  }

  export interface Location {
    label: string;
    stopCode: string;
    line1: string;
    line2: null;
    line3: null;
    city: string;
    state: string;
    country: Country;
    postalCode: string;
    latitude: number;
    longitude: number;
    timeZone: TimeZone;
    vendorCodes: null;
    domicile: string;
  }

  export enum Country {
    Us = 'US',
  }

  export enum TimeZone {
    AmericaChicago = 'America/Chicago',
    AmericaLosAngeles = 'America/Los_Angeles',
    AmericaNewYork = 'America/New_York',
    AmericaPhoenix = 'America/Phoenix',
  }

  export interface Load {
    versionedLoadId: VersionedLoadID;
    stops: Stop[];
    loadType: LoadType;
    equipmentType: EquipmentType;
    weight: null;
    distance: Deadhead;
    payout: Deadhead;
    costItems: CostItem[];
    layoverDuration: number;
    specialServices: any[];
    loadShipperAccounts: string[];
    shipperReferenceNumbers: any[];
    purchaseOrders: any[];
    isExternalLoad: boolean;
    existingSubCarrierName: ExistingSubCarrierName | null;
    workOpportunityId: string;
    loadfreightType: LoadfreightType;
    aggregatedFreightAttributes: AggregatedFreightAttributes;
    woLoadCarrierSpecificShipperAccounts: WoLoadCarrierSpecificShipperAccounts;
  }

  export interface AggregatedFreightAttributes {
    freightCommodities: CarrierEngagementCategory[];
    temperature: null;
  }

  export enum EquipmentType {
    FiftyThreeFootContainer = 'FIFTY_THREE_FOOT_CONTAINER',
    FiftyThreeFootTruck = 'FIFTY_THREE_FOOT_TRUCK',
    CubeTruck = 'CUBE_TRUCK',
    TwentySixFootBoxTruck = 'TWENTY_SIX_FOOT_BOX_TRUCK',
  }

  type ExistingSubCarrierName = string;

  export enum LoadType {
    Bobtail = 'BOBTAIL',
    Empty = 'EMPTY',
    Loaded = 'LOADED',
  }

  export enum LoadfreightType {
    Truckload = 'TRUCKLOAD',
  }

  export interface Stop {
    stopId: null;
    stopType: StopType;
    stopSequenceNumber: number;
    location: Location;
    locationCode?: string;
    weight: Deadhead | null;
    actions: Action[];
    trailerDetails: TrailerDetail[];
    loadingType: LoadingType | null;
    unloadingType: UnloadingType | null;
    pickupInstructions: null;
    deliveryInstructions: null;
    pickupNumbers: null;
    deliveryNumbers: null;
    contacts: null;
    stopRequirements: StopRequirement[];
    stopCategory: CarrierEngagementCategory;
    isVendorLocation: null;
    dropTrailerTime: null;
    calculatedEstimateArrivalTime: null;
    appointmentApplicability: any[];
  }

  export interface Action {
    type: Type;
    plannedTime: string;
    actualTime: null;
    actualTimeSource: null;
    delayReport: null;
    yardEvents: null;
  }

  export enum Type {
    Checkin = 'CHECKIN',
    Checkout = 'CHECKOUT',
  }

  export enum LoadingType {
    Preloaded = 'PRELOADED',
  }

  export interface StopRequirement {
    requirement: null;
    stopRequirementType: StopRequirementType;
    containerOwner: string;
    oceanCarrierSCAC: null;
  }

  export enum StopRequirementType {
    Container = 'CONTAINER',
  }

  export enum StopType {
    Dropoff = 'DROPOFF',
    Pickup = 'PICKUP',
  }

  export interface TrailerDetail {
    assetId: null;
    assetSource: null;
    assetOwner: ExistingSubCarrierName;
    assetType: null;
    trailerLoadingStatus: null;
    dropTrailerETA: null;
  }

  export enum UnloadingType {
    Drop = 'DROP',
  }

  export interface VersionedLoadID {
    id: string;
    version: null;
  }

  export interface WoLoadCarrierSpecificShipperAccounts {
    VAS: boolean;
    GLOBAL_MILE: boolean;
  }

  export interface SearchChannelStampedDuration {
    workOpportunities: number;
    bidding: number;
    operator: number;
    postATruck: number;
    commercialCarrierAdhocBoard: number;
    contract: number;
    negotiation: number;
  }

  export enum TourState {
    WorkOpportunity = 'work-opportunity',
  }

  export enum TransitOperatorType {
    SingleDriver = 'SINGLE_DRIVER',
    TeamDriver = 'TEAM_DRIVER',
  }

  export enum WorkOpportunityType {
    OneWay = 'ONE_WAY',
    RoundTrip = 'ROUND_TRIP',
  }

  export enum WorkType {
    Spot = 'SPOT',
  }
}

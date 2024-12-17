import {
    AllTags,
    AvatarIdType,
    FileIdType,
    GroupIdType,
    GroupRoleIdType,
    LicenseGroupIdType,
    PermissionIdType,
    ProductListingIdType,
    SearchOrderOptions,
    SearchSortingOptions,
    TiliaDatabaseIdType,
    tiliaIdType,
    TransactionIdType,
    UserIdType,
} from './Generics';

//! --- Economy --- !//

export type TransactionStatus = 'active' | 'failed' | 'expired' | 'chargeback';
export type SubscriptionPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';
export type transactionWalletInfoStatus = 'Trusted';

export type Subscription = {
    /** The ID of the subscription
     *
     * Can be `vrchatplus-yearly` or `vrchatplus-monthly` by example.
     */
    id: string;
    steamItemId: string;
    oculusSku: string; // todo new - undocumented
    amount: number;
    description: string;
    period: SubscriptionPeriod;
    tier: number;
};

export type SubscriptionComplete = {
    /** The ID of the subscription
     * Can be `vrchatplus-yearly` or `vrchatplus-monthly` by example.
     *
     */
    id: string;
    /** Transaction ID */
    transactionId: TransactionIdType;
    /** Which "Store" it came from. Right now only Stores are "Steam" and "Admin"  */
    store: string;
    /** The Steam Item ID */
    steamItemId: string;
    /** The Amount of the subscription */
    amount: number;
    /** The Description of the subscription */
    description: string;
    /** The Period of the subscription, see Enum SubscriptionPeriod. Default: month */
    period: SubscriptionPeriod;
    /** The Tier of the subscription */
    tier: number;
    /** If this subscription is active or not */
    active: boolean;
    /** The transactino status, see Enum TransactionStatus. Default: active */
    status: TransactionStatus;
    /** The Date this subscription starts */
    starts: string;
    /** The Date this subscription will expire */
    expires: string;
    /** The Date this subscription was created */
    created_at: string;
    /** The Date this subscription was last updated */
    updated_at: string;
    /** A list of License Groups associated with this subscription */
    licenseGroup: string[];
    /** If this subscription is a gift or not */
    isGift: boolean;
    /** When this was part of a multi gift purchase. Thanks to VRChat new option to throw gifts on the floor.
     *
     * This feature is in use in Open beta since November 2024.  */
    isBulkGift: boolean;
};

export type TransactionSteamWalletInfo = {
    /** The State of the transaction. */
    state: string;
    /** The Country of the transaction. Default: US. Min. 2 characters */
    country: string;
    /** The currency of the transaction. Default: USD. Min. 3 characters */
    currency: string;
    /** The status of the transaction. Min. 1 character */
    status: transactionWalletInfoStatus;
};

export type TransactionSteamInfo = {
    walletInfo: TransactionSteamWalletInfo;
    /** Steam ID of the user. */
    steamId: string;
    /** Steam Order ID. */
    orderId: string;
    /** Steam App ID.? */
    steamUrl?: string; // todo need better documentation, always empty
    /** Steam Transaction ID. */
    transId: string;
};

export type TransactionAgreement = {
    agreementId: string;
    itemId: number;
    status: string;
    period: string;
    frequency: number;
    billingType: string;
    startDate: string;
    endDate: string;
    recurringAmt: number;
    currency: string;
    timeCreated: string;
    nextPayment: string;
    lastPayment: string;
    lastAmount: number;
    lastAmountVat: number;
    outstanding: number;
    failedAttempts: number;
};

export type SteamTransaction = {
    id: TransactionIdType;
    userId: UserIdType;
    userDisplayName: string; // todo new - undocumented
    steam?: TransactionSteamInfo;
    /** Status of the transaction, see Enum TransactionStatus. Default: active */
    status: TransactionStatus;
    /** I don't know what this is? Default: false */
    sandbox: boolean;
    subscription: Subscription;
    created_at: string;
    updated_at: string;
    error: string;
    isGift: boolean; // todo new - undocumented
    isToken: boolean; // todo new - undocumented
    targetUserId: string; // todo new - undocumented
    targetDisplayName: string; // todo new - undocumented
    appliedToSubscriptionError?: unknown; // todo new - undocumented
    appliedToSubscriptionId?: unknown; // todo new - undocumented
    /** The agreement between you and steam, if any */
    agreement?: TransactionAgreement | string;
};

export type SteamTransactions = SteamTransaction[];

export type LicenseBase = {
    /** The name of the product. */
    forName: string;
    /** The action the owner took on this purchase. See Enum LicenseAction. Default: have */
    forAction: LicenseAction;
};

export type License = LicenseAvatarType | LicenseGroupType | LicensePermissionType | LicenseProductType;

export type LicenseAvatarType = LicenseBase & {
    /** A AvatarID. */
    forId: AvatarIdType;
    /** The type of the license. In this case, it's always avatar. */
    forType: LicenseType.Avatar;
};

export type LicenseGroupType = LicenseBase & {
    /** A LicenseGroupID. */
    forId: LicenseGroupIdType;
    /** The type of the license. In this case, it's always licenseGroup. */
    forType: LicenseType.LicenseGroup;
};

export type LicensePermissionType = LicenseBase & {
    /** A PermissionID. */
    forId: PermissionIdType;
    /** The type of the license. In this case, it's always permission. */
    forType: LicenseType.Permission;
};

export type LicenseProductType = LicenseBase & {
    /** A ProductID. */
    forId: ProductListingIdType;
    /** The type of the license. In this case, it's always product. */
    forType: LicenseType.Product;
};

export type LicenseGroup = {
    id: LicenseGroupIdType;
    name: string;
    description: string;
    licenses: License[];
};

export enum LicenseType {
    Avatar = 'avatar',
    LicenseGroup = 'licenseGroup',
    Permission = 'permission',
    Product = 'product',
}

export enum LicenseAction {
    Wear = 'wear',
    Have = 'have',
}

export type SyncData = {
    // Those are related I think to your account being authorize to publish or not, if you created an account with Tilia as a creator, etc
    kycRequired: boolean; // todo documentation unsure here
    kycRequiredTilia: boolean; // todo documentation unsure here
    kycState: kycStateTypes; // todo documentation unsure here
    /** The date you did your last Payout */
    lastPayoutDate: string;
    /** System tags associated with you as a seller (not the same as the user tags) */
    tags: AllTags[];
    /** If you are blocked to use the Creator economy system */
    tiliaBlocked: boolean;
    /** The email used to create your Tilia account. (The same as your vrchat account) UNCENSORED BE CAREFUL */
    tiliaEmail: string;
    /** The id of your Tilia account
     *
     * Format: acct_X9X9X9X9X9X9X9X9X9X9X9X9X9X
     */
    tiliaId: tiliaIdType;
    /** If you have accepted the Tilia terms of service */
    tiliaTosAccepted: boolean;
    /** The type of Tilia account you have */
    tiliaType: TiliaTypes;
    /** Your vrchat userID */
    userId: UserIdType;
    /** When your Tilia account was created. Normally this is when you opened the Marketplace page for the first time either on the website or the game */
    _created_at: string;
    /** database ID from linking your vrchat account to Tilia
     *
     * Format: till_4d4d4d4d-d4d4-d4d4-d4d4-d4d4d4d4d4d4
     */
    _id: TiliaDatabaseIdType;
    /** When your Tilia account was last updated. */
    _updated_at: string;
};

export type Balance = {
    /** The balance of your account */
    balance: number;
    /** The field is true if you haven't done any transaction yet */
    noTransactions?: boolean;
    /** This field is true if you have interacted with the Tilia system */
    tiliaResponse: boolean;
};

export enum TiliaTypes {
    Live = 'live',
}

export enum kycStateTypes {
    Unsubmitted = 'unsubmitted',
}

export type Transactions = {
    transactions: Transaction[];
    totalCount: number;
};

export type Transaction = {
    /** The ID of the transaction */
    id: TransactionIdType;
    /** The Listing ID of this transaction, Is null is it was token buying */
    listingId?: ProductListingIdType;
    /** The name of this transaction if any. When buying credit is typically "XXX VRChat Credits" */
    name: string;
    /** The Image ID of this listing is any. When buying VRChat credit this is null */
    listingImageId?: string;
    /** The Purchase ID? Undocumented field, is empty when buying VRChat credit */
    purchaseId: string; // todo documentation unsure here
    /** The User ID of the user who bought this */
    toUserId: UserIdType;
    /** The display name of the user who bought this */
    toUserDisplayName: string;
    /** When buying credit this will be 'vrchat-token' */
    fromUserId: UserIdType;
    /** When buying credit will display 'Steam' */
    fromUserDisplayName: string;
    /** When buying credit will display 'Steam' */
    sellerDisplayName: string;
    /** The type of transaction, see Enum TransactionType */
    type: TransactionType;
    /** The date this transaction was created */
    created_at: string;
    /** Trilia Reference ID
     *
     * format: vtok_4Wa4Wa4Wa4Wa4Wa4Qaq4Q4qQAAd */
    triliaRef: string; // todo documentation unsure here
    /** The amount of tokens this transaction cost */
    amoutTokens: number;
    /** The amount of VRChat Credit left after this transaction */
    runningBalance: number;
    /** The type of transaction being percieved here (for now only 'purchaser') */
    transactionPOV: TransactionPOV; // todo documentation unsure here
};

export enum TransactionType {
    All = 'all',
    User_Listing_Purchase = 'user_listing_purchase',
    User_Token_Purchase = 'user_token_purchase',
}

export enum TransactionPOV {
    Purchaser = 'purchaser',
}

export type Purchase = {
    /** The ID of the purchase */
    purchaseId: string; // todo To potentially update
    /** The ID of the listing */
    listingId: ProductListingIdType;
    /** The Displayname of the listing, could be the name of the Udon object or Group Role */
    listingDisplayName: string;
    /** The Image ID of the listing/purchase */
    ListingImageId: string;
    /** The list of products included in this purchase (can be multiple) */
    products: (ProductListingRole | ProductListingUdon)[];
    /** The User ID of the seller who sold this listing */
    sellerId: UserIdType;
    /** The Displayname of the seller who sold this listing */
    sellerDisplayName: string;
    /** The User ID of the buyer who bought this listing */
    buyerId: UserIdType;
    /** The Displayname of the buyer who bought this listing */
    buyerDisplayName: string;
    /** Who received this purchased listing (you or the person you gifted it to <3 ) */
    receiverId: UserIdType;
    /** The Displayname of the person who received this purchased listing (you or the person you gifted it to <3 ) */
    receiverDisplayName: string;
    /** The price in VRChat Credit this has cost (that will display) */
    purchasePrice: number;
    /** The price in VRChat Credit that will be used to calculate total price */
    purchaseUnitPrice: number; // todo this is more a guess, need better documentation
    /** How many unit(s) of this purchase was done */
    purchaseQuantity: number;
    /** The date this purchase was done */
    purchaseDate: string;
    /** If this purchase was the last one you've done or not */
    purchaseLatest: boolean;
    /** The duration of this purchase, if a subscription might be a number of months/day, etc */
    purchaseDuration: number;
    /** The type of duration, see Enum DurationType */
    purchaseDurationType: DurationType;
    /** The date this purchase will start */
    purchaseStartDate: string;
    /** The date this purchase will expire */
    purchaseEndDate: string;
    /** If you get something right after paying or not */
    instant: boolean; // todo documentation unsure here
    /** If this purchase is permanent or not */
    permanent: boolean; // todo documentation unsure here
    /** If this purchase is stackable or not */
    stackable: boolean;
    /** If this purchase is reccurable or not, this is not yet available to public, will soon */
    recurrable: boolean;
    /** If this purchase is refundable or not */
    refundable: boolean;
    /** If this purchase will be Recurent or not, (for in the future, not yet released) */
    willRecur: boolean;
    /** The Transaction ID with Tilia */
    tiliaTransactionId: string;
    /** Is this purchase is active or not */
    purchaseActive: boolean;
    /** If this purchase is a gift or not */
    isGift: boolean;
    /** How many of this purchase you've bought */
    stackQuantity: number;
    /** How many of this purchase you've consumed */
    stackQuantityConsumed: number;
    /** How many of this purchase you've not consumed */
    stackQuantityUnconsumed: number;
    /** How many of this purchase you've consumed at purchase */
    stackQuantityConsumedAtPurchase: number;
    /** How many of this purchase you've not consumed at purchase */
    stackQuantityUnconsumedAtPurchase: number;
    /** The total price for all the quantity bought */
    stackPrice: number;
    /** The total duration of all the stack */
    stackDuration: number;
    /** The type of duration for the stack, see Enum DurationType */
    stackDurationType: DurationType;
    /** If that product is still available for purchase or not */
    listingCurrentlyAvailable: boolean;
};

export type LicenseObject = {
    /** The ID of the license */
    id: string;
    /** The VRChat User ID of the owner of the licensed product (not this exact license) */
    ownerId: string;
    /** The display name of the owner of the licensed product (not this exact license) */
    ownerDisplayName: string;
    /** The ID of the Group that this product purchased belongs to */
    forId: string;
    /** The type of the Group that this product purchased belongs to */
    forType: LicenseType;
    /** Name of the product purchased */
    forName: string;
    /** The action the owner took on this purchase */
    forAction: ActionTypes;
    /** The product ID of the purchased item */
    productId: string;
    /** The type of the product purchased */
    productType: ProductType;
    /** The User ID of the user who created this License (The buyer normally) */
    licenseHolderId: string;
    /** The type of License Holder who created this License (The buyer normally) */
    licenseHolderType: LicenceHolderType;
    /** The display name of the user who created this License (The buyer normally) */
    licenseHolderDisplayName: string;
    /** If this license is active or not */
    isActive: boolean;
    /** If this license is currently active or not */
    isCurrent: boolean; // todo documentation unsure here
    /** The date this license is expiring */
    untilDate: string;
    /** The tags associated with this license */
    tags: AllTags[];
    /** The notes associated with this license */
    notes: string[]; // need more research
    /** The date this license was created */
    created: string;
};

export enum LicenceHolderType {
    User = 'user',
}

export enum LicenseType {
    Role = 'role',
}

export enum ActionTypes {
    Have = 'have',
}

export type Listing = {
    /** Listing ID */
    id: ProductListingIdType;
    /** The date this listing was created */
    created: string;
    /** The date this listing was last updated */
    updated: string;
    /** The type of Listing (Only 'listing' for now) */
    productType: ProductListingType;
    /** The User ID of the User who created this Listing */
    sellerId: UserIdType;
    /** The display name of the User who created this Listing */
    sellerDisplayName: string;
    /** The name of this Listing */
    displayName: string;
    /** The description of this Listing */
    description: string;
    /** The ID of the image for this Listing */
    imageId: string;
    /** The tags associated with this Listing */
    tags: AllTags[];
    /** If this Listing has been archived or not (currently being sold or not) */
    archived: boolean;
    /** All the different products sold for that listing, (if you buy that listing, you get all the products) */
    products?: (ProductListingRole | ProductListingUdon)[];
    /** The price of the listing in tokens 1VRC Token = 0.005$ Aprox. */
    priceTokens: number;
    /** from the duration type, how many of that type of duration */
    duration?: number;
    /** The type of duration, see Enum DurationType */
    durationType?: DurationType;
    /** If this listing is permanent or not */
    permanent: boolean;
    /** If this listing is instant or not */
    instant: boolean;
    /** If this listing is stackable or not, you can buy multiple? */
    stackable: boolean;
    /** If this listing is recurrable or not. This is not yet available to public, will soon */
    recurrable: boolean;
    /** If this listing is refundable or not.*/
    refundable: boolean; // todo to better document this
    /** UNDOCUMENTED YET */
    buyerRefundable: boolean; // todo to better document this
    /** If this listing is active or not. */
    active: boolean; // todo to better document this
    /** The Group ID associated with this listing */
    groupId?: GroupIdType;
    /** The Group Icon associated with this listing */
    groupIcon: FileIdType;
    /** Other Listing variant(s) if available */
    listingVariants: unknown[]; // todo to better document this
};

export enum DurationType {
    Day = 'day', // todo not documented, only assuming
    Month = 'month',
}

export enum ProductListingType {
    Listing = 'listing',
}

export type ProductBase = {
    /** Product ID */
    id: ProductListingIdType;
    /** The date this product was created */
    created: string;
    /** The date this product was last updated */
    updated: string;
    /** The User ID of the user selling this */
    sellerId: UserIdType;
    /** The display name of the User selling this */
    sellerDisplayName: string;
    /** The name of what is being sold here */
    displayName: string;
    /** The description of the item being sold here */
    description: string;
    /** The ID only of the image for that item */
    imageId: string;
    /** The tags associated with this item */
    tags: AllTags[];
    /** If this item has been archived or not (currently being sold or not) */
    archived: boolean;
    /** If there is any product parent to this product */
    parentListings: string[];
};

export type ProductListingRole = ProductBase & {
    /** The type of the product, see Enum ProductType */
    productType: ProductType.Udon;
};

export type ProductListingUdon = ProductBase & {
    /** The type of the product, see Enum ProductType */
    productType: ProductType.Role;
    /** The Group ID related to this item, IF productType is = role */
    groupId?: GroupIdType;
    /** The Group Role ID that is given as a sold item, IF productType is = role */
    groupRoleId?: GroupRoleIdType;
    /** If you currently have access to this group (part of that group) */
    groupAccess?: boolean; // todo to better document this
    /** Undocumented */
    groupAccessRemove?: boolean; // todo to better document this
};

export enum ProductType {
    Role = 'role',
    Udon = 'udon',
}

export type BalanceResult = {
    /** The balance of your account */
    balance: number;
};

export type TOS = {
    /** If you have accepted the latest Tilia TOS or not */
    signed_tos: boolean;
};

export type TokenBundle = {
    /** The ID of the Token Bundle */
    id: string;
    /** The Steam Item ID */
    steamItemId: string;
    /** The Oculus SKU */
    oculusSku: string;
    /** The amount of the Token Bundle */
    amount: number;
    /** The description of the Token Bundle */
    description: string;
    /** How many tokens you get for this Token Bundle */
    tokens: number;
    /** The Image URL of the Token Bundle */
    imageUrl: string;
};

/**
 * The Tilia Integration Status
 */
export type TiliaStatus = {
    /** Undocumented Yet */
    economyOnline: boolean;
};

//! --- Requests --- !//

/** Requirement to get all Steam Transactions using a Transaction ID */
export type GetSteamTransactionRequest = {
    /** The ID of the Steam Transaction */
    transactionId: TransactionIdType;
};

/** Requirement to get all License Groups */
export type GetLicenseGroupRequest = {
    /** The ID of the License Group */
    licenseGroupId: LicenseGroupIdType;
};

/** Requirement to get all Product Listings */
export type GetProductListingRequest = {
    /** The ID of the Listing */
    listingId: ProductListingIdType;
    /** Hydrate is used if you want more detailed information about products as well as related listing */
    hydrate?: boolean;
};

/** Requirement to get all Current Subscriptions */
export type GetOwnPurchasesRequest = {
    buyerId?: UserIdType;
    mostRecent?: boolean;
    getAll?: boolean;
    n?: number;
    offset?: number;
};

/** Requirement to get all Transactions */
export type GetOwnTransactionsRequest = {
    type?: TransactionType;
    order?: SearchOrderOptions;
    sort?: SearchSortingOptions;
    metadata?: boolean;
    search?: string;
    n?: number;
    offset?: number;
};

/** Requirement to get all Tilia Data */
export type GetTiliaTOSRequest = {
    /** The User ID given to see the Tilia TOS data */
    userId?: UserIdType;
};

/** Requirement to get a User's Balance */
export type GetUserBalanceRequest = {
    /** The User ID given to see the balance of that user */
    userId?: UserIdType;
};

/** Requirement to get a License */
export type GetLicenseRequest = {
    /** The ID of the License */
    licenseId: LicenseGroupIdType;
};

/**
 * Gets the product listings of a given user
 */
export type getUserProductListingsRequest = {
    /** The User ID of the User to get the product listings */
    userId: UserIdType;
    /** The number of product to get */
    n?: number;
    /** The offset from zero index */
    offset?: number;
    /** If you want to hydrate the product */
    hydrate?: boolean; // TODO Requires more Documentation
    /** The Group ID of the Group to get the product listings */
    groupId?: GroupIdType;
    /** Get only the active product listings */
    active?: boolean;
};

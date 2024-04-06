import { AllTags } from './Generics';
import { SearchOrderOptions, SearchSortingOptions } from './Worlds';

//! --- Economy --- !//

export type TransactionStatus = 'active' | 'failed' | 'expired' | 'chargeback';
export type SubscriptionPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';
export type transactionWalletInfoStatus = 'Trusted';

export type Subscription = {
    id: string;
    steamItemId: string;
    oculusSku: string; // todo new - undocumented
    amount: number;
    description: string;
    period: SubscriptionPeriod;
    tier: number;
};

export type SubscriptionComplete = {
    /** Min. 1 character */
    id: string;
    /** Transaction ID */
    transactionId: string;
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
    id: string;
    userId: string; // todo new - undocumented
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

export type License = {
    /** Either a AvatarID, LicenseGroupID, PermissionID or ProductID. This depends on the forType field. */
    forId: string;
    /** The type of the license. See Enum LicenseType. Default: permission */
    forType: LicenseType;
    /** The name of the product. */
    forName: string;
    /** The action the owner took on this purchase. See Enum LicenseAction. Default: have */
    forAction: LicenseAction;
};

export type LicenseGroup = {
    id: string;
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
    tiliaId: string;
    /** If you have accepted the Tilia terms of service */
    tiliaTosAccepted: boolean;
    /** The type of Tilia account you have */
    tiliaType: TiliaTypes;
    /** Your vrchat userID */
    userId: string;
    /** When your Tilia account was created. Normally this is when you opened the Marketplace page for the first time either on the website or the game */
    _created_at: string;
    /** database ID from linking your vrchat account to Tilia
     *
     * Format: till_4d4d4d4d-d4d4-d4d4-d4d4-d4d4d4d4d4d4
     */
    _id: string;
    /** When your Tilia account was last updated. */
    _updated_at: string;
};

export type Balance = {
    balance: number;
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
    id: string;
    /** The Listing ID of this transaction, Is null is it was token buying */
    listingId?: string;
    /** The name of this transaction if any. When buying credit is typically "XXX VRChat Credits" */
    name: string;
    /** The Image ID of this listing is any. When buying VRChat credit this is null */
    listingImageId?: string;
    /** The Purchase ID? Undocumented field, is empty when buying VRChat credit */
    purchaseId: string; // todo documentation unsure here
    /** The User ID of the user who bought this */
    toUserId: string;
    /** The display name of the user who bought this */
    toUserDisplayName: string;
    /** When buying credit this will be 'vrchat-token' */
    fromUserId: string;
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
    triliaRef: string;
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
    purchaseId: string;
    /** The ID of the listing */
    listingId: string;
    /** The Displayname of the listing, could be the name of the Udon object or Group Role */
    listingDisplayName: string;
    /** The Image ID of the listing/purchase */
    ListingImageId: string;
    /** The list of products included in this purchase (can be multiple) */
    products: (ProductListingRole | ProductListingUdon)[];
    /** The User ID of the seller who sold this listing */
    sellerId: string;
    /** The Displayname of the seller who sold this listing */
    sellerDisplayName: string;
    /** The User ID of the buyer who bought this listing */
    buyerId: string;
    /** The Displayname of the buyer who bought this listing */
    buyerDisplayName: string;
    /** Who received this purchased listing (you or the person you gifted it to <3 ) */
    receiverId: string;
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

export type Lisense = {
    /** The ID of the license */
    id: string;
    /** The VRChat User ID of the owner of the licensed product (not this exact license) */
    ownerId: string;
    /** The display name of the owner of the licensed product (not this exact license) */
    ownerDisplayName: string;
    /** The ID of the Group that this product purchased belongs to */
    forId: string;
    /** The type of the Group that this product purchased belongs to */
    forType: LisenseType;
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
    licenseHolderType: LisenceHolderType;
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

export enum LisenceHolderType {
    User = 'user',
}

export enum LisenseType {
    Role = 'role',
}

export enum ActionTypes {
    Have = 'have',
}

export type Listing = {
    /** Listing ID */
    id: string;
    /** The date this listing was created */
    created: string;
    /** The date this listing was last updated */
    updated: string;
    /** The type of Listing (Only 'listing' for now) */
    productType: ProductListingType;
    /** The User ID of the User who created this Listing */
    sellerId: string;
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
    duration: number;
    /** The type of duration, see Enum DurationType */
    durationType: DurationType;
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
    /** If this listing is active or not. */
    active: boolean; // todo to better document this
    /** The Group ID associated with this listing */
    groupId?: string;
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
    id: string;
    /** The date this product was created */
    created: string;
    /** The date this product was last updated */
    updated: string;
    /** The User ID of the user selling this */
    sellerId: string;
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
    groupId?: string;
    /** The Group Role ID that is given as a sold item, IF productType is = role */
    groupRoleId?: string;
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
    /** If you have accepted the Tilia TOS or not */
    signed_tos: boolean;
};

//! --- Requests --- !//

export type GetSteamTransactionRequest = {
    /** The ID of the Steam Transaction */
    transactionId: string;
};

export type GetLicenseGroupRequest = {
    /** The ID of the License Group */
    licenseGroupId: string;
};

export type GetProductListingRequest = {
    /** The ID of the Listing */
    listingId: string;
    /** Hydrate is used if you want more detailed information about products as well as related listing */
    hydrate?: boolean;
};

export type GetOwnPurchasesRequest = {
    buyerId?: string;
    mostRecent?: boolean;
    getAll?: boolean;
    n?: number;
    offset?: number;
};

export type GetOwnTransactionsRequest = {
    type?: TransactionType;
    order?: SearchOrderOptions;
    sort?: SearchSortingOptions;
    metadata?: boolean;
    search?: string;
    n?: number;
    offset?: number;
};

export type GetTiliaTOSRequest = {
    /** The User ID given to see the Tilia TOS data */
    userId?: string;
};

export type GetUserBalanceRequest = {
    /** The User ID given to see the balance of that user */
    userId: string;
};

export type GetLicenseRequest = {
    /** The ID of the License */
    licenseId: string;
};

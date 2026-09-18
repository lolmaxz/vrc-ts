import {
    FileIdType,
    InventoryDropIdType,
    InventoryItemIdType,
    InventoryTemplateIdType,
    InventoryTemplateRefIdType,
    PropIdType,
    UserIdType,
} from './Generics';

export enum InventoryItemType {
    Accessory = 'accessory',
    AvatarLook = 'avatarlook',
    Bundle = 'bundle',
    DroneSkin = 'droneskin',
    Emoji = 'emoji',
    IconFrame = 'iconFrame',
    NameplateEffect = 'nameplateEffect',
    PortalSkin = 'portalskin',
    ProfileEffect = 'profileEffect',
    Prop = 'prop',
    Sticker = 'sticker',
    WarpEffect = 'warpeffect',
    ProfileBackground = 'profileBackground',
}

export enum InventoryFlag {
    Archivable = 'archivable',
    Cloneable = 'cloneable',
    Consumable = 'consumable',
    Equippable = 'equippable',
    Instantiatable = 'instantiatable',
    Trashable = 'trashable',
    Ugc = 'ugc',
    Unique = 'unique',
    CampaignRewardItem = 'campaign_reward_item',
    Global = 'global',
    GlobalVisible = 'global_visible',
    VrcPlusExclusive = 'vrc_plus_exclusive',
}

export type InventoryAcquisition = 'unknown' | 'purchase' | 'drop' | 'gift' | 'reward';

export type InventoryAttributionCreator = {
    id?: string;
    name?: string;
    customName?: string;
    userId?: string;
};

export type InventoryAttribution = {
    creator?: InventoryAttributionCreator;
    id?: string;
    name?: string;
    collaborationId?: string | null;
    publisher?: unknown;
} | null;

export enum InventoryEquipSlot {
    None = '',
    Drone = 'drone',
    Portal = 'portal',
    Warp = 'warp',
    IconFrame = 'iconFrame',
    NameplateEffect = 'nameplateEffect',
    ProfileEffect = 'profileEffect',
}

export type InventoryAttributeValidator = {
    type?: string;
};

export type InventoryDefaultAttribute = {
    defaultValue?: string;
    validator?: InventoryAttributeValidator;
};

export type InventoryDefaultAttributes = Record<string, InventoryDefaultAttribute>;

export type InventoryMetadata = {
    animated?: boolean;
    animationStyle?: string;
    assetBundleId?: string;
    fileId?: FileIdType | string;
    imageUrl?: string;
    inventoryItemsToInstantiate?: InventoryTemplateIdType[];
    maskTag?: string;
    propId?: PropIdType;
    propKind?: number;
    viewfinderBundleId?: string;
    assets?: InventoryAsset[];
    gradientStart?: string;
    gradientEnd?: string;
};

export type InventoryAsset = {
    fileId?: string;
    frameCount?: number;
    framesPerSecond?: number;
    loopCount?: number;
    totalDurationMs?: number;
    type?: string;
    url?: string;
};

export type InventoryUserAttributes = {
    primary?: string;
    primaryColor?: string;
    secondaryColor?: string;
    trailColor?: string;
};

export type InventoryItem = {
    acquisition?: InventoryAcquisition | string;
    ancestor?: InventoryItemIdType | string;
    ancestorHolderId?: UserIdType | string;
    attribution?: InventoryAttribution;
    firstAncestor?: InventoryItemIdType | string;
    firstAncestorHolderId?: UserIdType | string;
    collections: string[];
    created_at: string;
    defaultAttributes: InventoryDefaultAttributes;
    description: string;
    equipSlot?: InventoryEquipSlot;
    equipSlots?: InventoryEquipSlot[];
    expiryDate: string | null;
    flags: InventoryFlag[];
    holderId: UserIdType;
    id: InventoryItemIdType;
    imageUrl: string;
    isArchived: boolean;
    isSeen: boolean;
    itemType: InventoryItemType;
    itemTypeLabel: string;
    last_equipped?: Record<string, string> | null;
    metadata: InventoryMetadata;
    name: string;
    quantifiable?: boolean;
    tags: string[];
    templateId: InventoryTemplateRefIdType;
    template_created_at: string;
    template_updated_at: string;
    updated_at: string;
    userAttributes: InventoryUserAttributes;
    validateUserAttributes: boolean;
};

export type Inventory = {
    data: InventoryItem[];
    totalCount: number;
};

export type InventoryNotificationDetails = {
    body: string;
    imageUrl: string;
    title: string;
};

export type InventoryDrop = {
    authorId: UserIdType;
    created_at: string;
    dropExpiryDate: string | null;
    endDropDate: string;
    id: InventoryDropIdType;
    name: string;
    notificationDetails: InventoryNotificationDetails;
    startDropDate: string;
    status: string;
    tags: string[];
    targetGroup: string;
    templateIds: InventoryTemplateIdType[];
    updated_at: string;
};

export type InventoryTemplate = {
    attribution?: InventoryAttribution;
    authorId: UserIdType;
    collections: string[];
    created_at: string;
    defaultAttributes?: InventoryDefaultAttributes;
    description: string;
    dropStatus?: string;
    equipSlots?: InventoryEquipSlot[];
    flags: InventoryFlag[];
    id: InventoryTemplateIdType;
    imageUrl: string;
    initialToggleState?: boolean;
    itemType: InventoryItemType;
    itemTypeLabel: string;
    metadata?: InventoryMetadata;
    name: string;
    notificationDetails?: InventoryNotificationDetails;
    productId?: string;
    publishedListings?: unknown[];
    status?: string;
    tags: string[];
    updated_at: string;
    validateUserAttributes?: boolean;
};

export type InventorySpawn = {
    token: string;
    version: number;
};

/** Live `GET /inventory/collections` returns collection names, not objects. */
export type InventoryCollection = string;

export type getInventoryRequest = {
    n?: number;
    offset?: number;
    order?: string;
    tags?: string;
    types?: InventoryItemType | string;
    flags?: InventoryFlag | string;
    notTypes?: InventoryItemType | string;
    notFlags?: InventoryFlag | string;
    archived?: boolean;
    seen?: boolean;
    isNavBar?: boolean;
};

export type getInventoryItemRequest = {
    inventoryItemId: InventoryItemIdType;
};

export type getUserInventoryItemRequest = getInventoryItemRequest & {
    userId: UserIdType;
};

export type getInventoryTemplateRequest = {
    inventoryTemplateId: InventoryTemplateIdType | InventoryTemplateRefIdType;
};

export type spawnInventoryItemRequest = {
    id: InventoryItemIdType;
};

export type shareInventoryItemPedestalRequest = {
    itemId: InventoryItemIdType;
    /** Seconds before the sharing pedestal despawns. */
    duration: number;
};

export type dataKeysShareInventoryItemDirect = {
    itemId: InventoryItemIdType;
    users: UserIdType[];
};

export type shareInventoryItemDirectRequest = dataKeysShareInventoryItemDirect;

export type dataKeysUpdateInventoryItem = {
    isArchived?: boolean;
    isSeen?: boolean;
    userAttributes?: InventoryUserAttributes;
};

export type updateInventoryItemRequest = getInventoryItemRequest & dataKeysUpdateInventoryItem;

/** Path values for `GET /cosmetics/index/{itemType}`. */
export type CosmeticIndexItemType =
    | InventoryItemType.DroneSkin
    | InventoryItemType.IconFrame
    | InventoryItemType.NameplateEffect
    | InventoryItemType.PortalSkin
    | InventoryItemType.ProfileBackground
    | InventoryItemType.ProfileEffect
    | InventoryItemType.WarpEffect
    | 'droneskin'
    | 'iconFrame'
    | 'nameplateEffect'
    | 'portalskin'
    | 'profileBackground'
    | 'profileEffect'
    | 'warpeffect';

export type getCosmeticIndexRequest = {
    itemType: CosmeticIndexItemType;
};

export type getUserCosmeticsRequest = {
    userId: UserIdType;
};

/** A cosmetic a user holds. Distinct from a full inventory item. */
export type UserCosmetic = {
    acquiredOn?: string;
    acquisition?: string;
    id?: InventoryItemIdType | string;
    itemType?: InventoryItemType | string;
    templateId?: InventoryTemplateIdType | string;
    userAttributes?: InventoryUserAttributes;
    equipSlot?: string;
};

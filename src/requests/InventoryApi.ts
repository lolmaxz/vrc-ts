import { BadRequestParameter } from '../errors';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType, RequestSuccess } from '../types/Generics';
import * as Inv from '../types/Inventory';
import { VRChatAPI } from '../VRChatAPI';
import { BaseApi } from './BaseApi';

export class InventoryApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    public async getInventory({
        n,
        offset,
        order,
        tags,
        types,
        flags,
        notTypes,
        notFlags,
        archived,
        seen,
        isNavBar,
    }: Inv.getInventoryRequest = {}): Promise<Inv.Inventory> {
        const parameters: URLSearchParams = new URLSearchParams();
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }
        if (offset !== undefined && offset >= 0) parameters.append('offset', offset.toString());
        if (order) parameters.append('order', order);
        if (tags) parameters.append('tags', tags);
        if (types) parameters.append('types', types);
        if (flags) parameters.append('flags', flags);
        if (notTypes) parameters.append('notTypes', notTypes);
        if (notFlags) parameters.append('notFlags', notFlags);
        if (archived !== undefined) parameters.append('archived', archived.toString());
        if (seen !== undefined) parameters.append('seen', seen.toString());
        if (isNavBar !== undefined) parameters.append('isNavBar', isNavBar.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getInventory,
            pathFormated: ApiPaths.inventory.getInventory.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Inv.Inventory>(paramRequest);
    }

    public async getInventoryItem({ inventoryItemId }: Inv.getInventoryItemRequest): Promise<Inv.InventoryItem> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getInventoryItem,
            pathFormated: ApiPaths.inventory.getInventoryItem.path.replace('{inventoryItemId}', inventoryItemId),
        };

        return await this.executeRequest<Inv.InventoryItem>(paramRequest);
    }

    public async getUserInventoryItem({
        userId,
        inventoryItemId,
    }: Inv.getUserInventoryItemRequest): Promise<Inv.InventoryItem> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getUserInventoryItem,
            pathFormated: ApiPaths.inventory.getUserInventoryItem.path
                .replace('{userId}', userId)
                .replace('{inventoryItemId}', inventoryItemId),
        };

        return await this.executeRequest<Inv.InventoryItem>(paramRequest);
    }

    public async getInventoryDrops(): Promise<Inv.InventoryDrop[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getInventoryDrops,
            pathFormated: ApiPaths.inventory.getInventoryDrops.path,
        };

        return await this.executeRequest<Inv.InventoryDrop[]>(paramRequest);
    }

    public async getInventoryTemplate({
        inventoryTemplateId,
    }: Inv.getInventoryTemplateRequest): Promise<Inv.InventoryTemplate> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getInventoryTemplate,
            pathFormated: ApiPaths.inventory.getInventoryTemplate.path.replace(
                '{inventoryTemplateId}',
                inventoryTemplateId
            ),
        };

        return await this.executeRequest<Inv.InventoryTemplate>(paramRequest);
    }

    public async getInventoryCollections(): Promise<string[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getInventoryCollections,
            pathFormated: ApiPaths.inventory.getInventoryCollections.path,
        };

        return await this.executeRequest<string[]>(paramRequest);
    }

    public async spawnInventoryItem({ id }: Inv.spawnInventoryItemRequest): Promise<Inv.InventorySpawn> {
        const parameters: URLSearchParams = new URLSearchParams();
        parameters.append('id', id);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.spawnInventoryItem,
            pathFormated: ApiPaths.inventory.spawnInventoryItem.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Inv.InventorySpawn>(paramRequest);
    }

    public async shareInventoryItemPedestal({
        itemId,
        duration,
    }: Inv.shareInventoryItemPedestalRequest): Promise<Inv.InventorySpawn> {
        const parameters: URLSearchParams = new URLSearchParams();
        parameters.append('itemId', itemId);
        parameters.append('duration', duration.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.shareInventoryItemPedestal,
            pathFormated: ApiPaths.inventory.shareInventoryItemPedestal.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Inv.InventorySpawn>(paramRequest);
    }

    public async shareInventoryItemDirect({
        itemId,
        users,
    }: Inv.shareInventoryItemDirectRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.shareInventoryItemDirect,
            pathFormated: ApiPaths.inventory.shareInventoryItemDirect.path,
            body: { itemId, users },
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    public async updateInventoryItem({
        inventoryItemId,
        isArchived,
        isSeen,
        userAttributes,
    }: Inv.updateInventoryItemRequest): Promise<Inv.InventoryItem> {
        const body: Inv.dataKeysUpdateInventoryItem = {};
        if (isArchived !== undefined) body.isArchived = isArchived;
        if (isSeen !== undefined) body.isSeen = isSeen;
        if (userAttributes) body.userAttributes = userAttributes;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.updateInventoryItem,
            pathFormated: ApiPaths.inventory.updateInventoryItem.path.replace('{inventoryItemId}', inventoryItemId),
            body,
        };

        return await this.executeRequest<Inv.InventoryItem>(paramRequest);
    }

    public async deleteInventoryItem({ inventoryItemId }: Inv.getInventoryItemRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.deleteInventoryItem,
            pathFormated: ApiPaths.inventory.deleteInventoryItem.path.replace('{inventoryItemId}', inventoryItemId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    public async getCosmeticIndex({ itemType }: Inv.getCosmeticIndexRequest): Promise<Inv.InventoryTemplate[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getCosmeticIndex,
            pathFormated: ApiPaths.inventory.getCosmeticIndex.path.replace('{itemType}', itemType),
        };

        return await this.executeRequest<Inv.InventoryTemplate[]>(paramRequest);
    }

    public async getUserCosmetics({ userId }: Inv.getUserCosmeticsRequest): Promise<Inv.UserCosmetic[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.inventory.getUserCosmetics,
            pathFormated: ApiPaths.inventory.getUserCosmetics.path.replace('{userId}', userId),
        };

        return await this.executeRequest<Inv.UserCosmetic[]>(paramRequest);
    }
}

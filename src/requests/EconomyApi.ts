import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import * as Eco from '../types/Economy';
import { executeRequestType } from '../types/Generics';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the Favorites API.
 */
export class EconomyApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    public async listSteamTransactions(): Promise<Eco.SteamTransactions> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.listSteamTransactions,
            pathFormated: ApiPaths.economy.listSteamTransactions.path,
        };

        return await this.executeRequest<Eco.SteamTransactions>(paramRequest);
    }

    /**
     * Get a Steam transaction by ID.
     * @param param0 transactionId - The ID of the transaction.
     * @returns {Promise<Eco.SteamTransaction>} - Returns a Promise with the response from the API.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public async getSteamTransaction({ transactionId }: Eco.GetSteamTransactionRequest): Promise<Eco.SteamTransaction> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getSteamTransaction,
            pathFormated: ApiPaths.economy.getSteamTransaction.path.replace('{transactionId}', transactionId),
        };

        return await this.executeRequest<Eco.SteamTransaction>(paramRequest);
    }

    public async getCurrentSubscriptions(): Promise<Eco.SubscriptionComplete[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getCurrentSubscriptions,
            pathFormated: ApiPaths.economy.getCurrentSubscriptions.path,
        };

        return await this.executeRequest<Eco.SubscriptionComplete[]>(paramRequest);
    }

    public async listSubscriptions(): Promise<Eco.Subscription[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.listSubscriptions,
            pathFormated: ApiPaths.economy.listSubscriptions.path,
        };

        return await this.executeRequest<Eco.Subscription[]>(paramRequest);
    }

    public async getLicenseGroup({ licenseGroupId }: Eco.GetLicenseGroupRequest): Promise<Eco.LicenseGroup> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getLicenseGroup,
            pathFormated: ApiPaths.economy.getLicenseGroup.path.replace('{licenseGroupId}', licenseGroupId),
        };

        return await this.executeRequest<Eco.LicenseGroup>(paramRequest);
    }

    public async getProductListing({
        listingId,
        hydrate = false, // defaults to false
    }: Eco.GetProductListingRequest): Promise<Eco.Listing> {
        const queryOptions = new URLSearchParams();
        if (hydrate) queryOptions.append('hydrate', hydrate.toString()); // Only append if set to true

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getProductListing,
            pathFormated: ApiPaths.economy.getProductListing.path.replace('{listingId}', listingId),
            queryOptions: queryOptions,
        };

        return await this.executeRequest<Eco.Listing>(paramRequest);
    }

    /**
     * Get the current user's product listings.
     *
     * Only works for your own account. So you can Omit the `userId` parameter.
     *
     * @param {Eco.getUserProductListingsRequest} param0 - The request parameters. ONE is required. Otherwise n=60 by default.
     * @returns {Promise<Eco.Listing[]>} - Returns a Promise with an array of a user's product listings.
     **/
    public async getUserProductListings({
        userId,
        n,
        offset,
        hydrate,
        groupId,
        active,
    }: Eco.getUserProductListingsRequest): Promise<Eco.Listing[]> {
        const queryOptions = new URLSearchParams();
        if (n && n > 0) {
            queryOptions.append('n', n.toString());
        } else {
            queryOptions.append('n', '60');
        }
        if (offset && offset > 0) queryOptions.append('offset', offset.toString());
        if (hydrate) queryOptions.append('hydrate', hydrate.toString());
        if (groupId) queryOptions.append('groupId', groupId);
        if (active) queryOptions.append('active', active.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getUserProductListings,
            pathFormated: ApiPaths.economy.getUserProductListings.path.replace('{userId}', userId),
            queryOptions: queryOptions,
        };

        return await this.executeRequest<Eco.Listing[]>(paramRequest);
    }

    /**
     * Get the current user's list of Token Bundles.
     *
     * @returns {Promise<Eco.TokenBundle[]>} - Returns a Promise with the response from the API.
     * @memberof EconomyApi
     */
    public async listTokenBundles(): Promise<Eco.TokenBundle[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.listTokenBundles,
            pathFormated: ApiPaths.economy.listTokenBundles.path,
        };

        return await this.executeRequest<Eco.TokenBundle[]>(paramRequest);
    }

    public async getTiliaStatus(): Promise<Eco.TiliaStatus> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getTiliaStatus,
            pathFormated: ApiPaths.economy.getTiliaStatus.path,
        };

        return await this.executeRequest<Eco.TiliaStatus>(paramRequest);
    }

    /**
     * Get a user's Tilia TOS.
     *
     * @param {Eco.GetTiliaTOSRequest} param0 - The request parameters.
     * @returns {Promise<Eco.TOS>} - Returns a Promise with the Tilila TOS of the user.
     */
    public async getTiliaTOS({ userId }: Eco.GetTiliaTOSRequest): Promise<Eco.TOS> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getTiliaTOS,
            pathFormated: userId
                ? ApiPaths.economy.getTiliaTOS.path.replace('{userId}', userId)
                : ApiPaths.economy.getTiliaTOS.path,
        };

        return await this.executeRequest<Eco.TOS>(paramRequest);
    }

    /**
     * Get the current user's purchases.
     *
     * Only works for your own account. So you can Omit the `buyerId` parameter.
     *
     *
     * @param {Eco.GetOwnPurchasesRequest} param0 - The request parameters.
     * @returns {Promise<Eco.Purchase[]>} - Returns a Promise with the response from the API.
     */
    public async getOwnPurchases({
        buyerId,
        mostRecent,
        getAll,
        n,
        offset,
    }: Eco.GetOwnPurchasesRequest): Promise<Eco.Purchase[]> {
        const queryOptions = new URLSearchParams();
        if (buyerId) queryOptions.append('buyerId', buyerId);
        if (mostRecent) queryOptions.append('mostRecent', mostRecent.toString());
        if (getAll) queryOptions.append('getAll', getAll.toString());
        if (n) queryOptions.append('n', n.toString());
        if (offset) queryOptions.append('offset', offset.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getOwnPurchases,
            pathFormated: ApiPaths.economy.getOwnPurchases.path,
            queryOptions: queryOptions,
        };

        return await this.executeRequest<Eco.Purchase[]>(paramRequest);
    }

    /**
     * Get the current user's transactions.
     *
     * @param {Eco.GetOwnTransactionsRequest} param0 - The request parameters.
     * @returns {Promise<Eco.Transactions>} - Returns a Promise with the response from the API.
     */
    public async getOwnTransactions({
        type = Eco.TransactionType.All,
        order,
        sort,
        metadata,
        search,
        n,
        offset,
    }: Eco.GetOwnTransactionsRequest): Promise<Eco.Transactions> {
        const queryOptions = new URLSearchParams();
        queryOptions.append('type', type);

        if (order) queryOptions.append('order', order);
        if (sort) queryOptions.append('sort', sort);
        if (metadata) queryOptions.append('metadata', metadata.toString());
        if (search) queryOptions.append('search', search);
        if (n) queryOptions.append('n', n.toString());
        if (offset) queryOptions.append('offset', offset.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getOwnTransactions,
            pathFormated: ApiPaths.economy.getOwnTransactions.path,
            queryOptions: queryOptions,
        };

        return await this.executeRequest<Eco.Transactions>(paramRequest);
    }

    /**
     * Get the current user's Tilia information.
     *
     * Only works for your own account. Specially for this endpoint you can Omit the `userId` parameter.
     *
     * @param param0
     * @returns
     */
    public async getTiliaSyncData({ userId }: Eco.GetTiliaTOSRequest): Promise<Eco.SyncData> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getTiliaSyncData,
            pathFormated: userId
                ? ApiPaths.economy.getTiliaSyncData.path.replace('{userId}', userId)
                : ApiPaths.economy.getTiliaSyncData.path,
        };

        return await this.executeRequest<Eco.SyncData>(paramRequest);
    }

    /**
     * Get the current user's balance.
     *
     * Only works for your own account. So you can Omit the `userId` parameter.
     *
     * @param {Eco.GetUserBalanceRequest} param0 - The request parameters.
     * @returns {Promise<Eco.Balance>} - Returns a Promise with the response from the API.
     */
    public async getBalance({ userId }: Eco.GetUserBalanceRequest = {}): Promise<Eco.Balance> {
        if (!userId && this.baseClass.currentUser) {
            userId = this.baseClass.currentUser.id;
        } else {
            throw new Error('You need to provide a userId or be logged in to get the balance.');
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getBalance,
            pathFormated: ApiPaths.economy.getBalance.path.replace('{userId}', userId),
        };

        return await this.executeRequest<Eco.Balance>(paramRequest);
    }

    public async getLicenses({ licenseId }: Eco.GetLicenseRequest): Promise<Eco.License> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.economy.getLicenses,
            pathFormated: ApiPaths.economy.getLicenses.path.replace('{licenseId}', licenseId),
        };

        return await this.executeRequest<Eco.License>(paramRequest);
    }
}

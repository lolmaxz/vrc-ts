import { VRChatAPI } from "../VRChatAPI";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Favorites API.
 */
export class EconomyApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    public async listSteamTransactions(): Promise<VRCAPI.Economy.Models.SteamTransactions> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.listSteamTransactions,
            pathFormated: ApiPaths.economy.listSteamTransactions.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.SteamTransactions>(paramRequest);
    }

    public async getSteamTransaction({
        transactionId
    }: VRCAPI.Economy.Requests.GetSteamTransactionRequest): Promise<VRCAPI.Economy.Models.SteamTransaction> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getSteamTransaction,
            pathFormated: ApiPaths.economy.getSteamTransaction.path.replace('{transactionId}', transactionId),
        };

        return await this.executeRequest<VRCAPI.Economy.Models.SteamTransaction>(paramRequest);
    }

    public async getCurrentSubscriptions(): Promise<VRCAPI.Economy.Models.SubscriptionComplete[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getCurrentSubscriptions,
            pathFormated: ApiPaths.economy.getCurrentSubscriptions.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.SubscriptionComplete[]>(paramRequest);

    }

    public async listSubscriptions(): Promise<VRCAPI.Economy.Models.Subscription[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.listSubscriptions,
            pathFormated: ApiPaths.economy.listSubscriptions.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.Subscription[]>(paramRequest);

    }

    public async getLicenseGroup({
        licenseGroupId
    }: VRCAPI.Economy.Requests.GetLicenseGroupRequest): Promise<VRCAPI.Economy.Models.LicenseGroup> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getLicenseGroup,
            pathFormated: ApiPaths.economy.getLicenseGroup.path.replace('{licenseGroupId}', licenseGroupId),
        };

        return await this.executeRequest<VRCAPI.Economy.Models.LicenseGroup>(paramRequest);
    }

    public async getProductListing({
        listingId,
        hydrate = false // defaults to false
    }: VRCAPI.Economy.Requests.GetProductListingRequest): Promise<VRCAPI.Economy.Models.Listing> {

        const queryOptions = new URLSearchParams();
        if (hydrate) queryOptions.append('hydrate', hydrate.toString()); // Only append if set to true


        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getProductListing,
            pathFormated: ApiPaths.economy.getProductListing.path.replace('{listingId}', listingId),
            queryOptions: queryOptions,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.Listing>(paramRequest);

    }

    public async getOwnSubscription(): Promise<VRCAPI.Economy.Models.SubscriptionComplete> {
            
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.economy.getOwnSubscription,
                pathFormated: ApiPaths.economy.getOwnSubscription.path,
            };
    
            return await this.executeRequest<VRCAPI.Economy.Models.SubscriptionComplete>(paramRequest);
    }

    public async getTiliaTOS({
        userId
    }: VRCAPI.Economy.Requests.GetTiliaTOSRequest): Promise<VRCAPI.Economy.Models.TOS> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getTiliaTOS,
            pathFormated: userId ? ApiPaths.economy.getTiliaTOS.path.replace('{userId}', userId) : ApiPaths.economy.getTiliaTOS.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.TOS>(paramRequest);

    }

    /**
     * Get the current user's purchases.
     * 
     * Only works for your own account. So you can Omit the `buyerId` parameter.
     * 
     * 
     * @param {VRCAPI.Economy.Requests.GetOwnPurchasesRequest} param0 - The request parameters.
     * @returns {Promise<VRCAPI.Economy.Models.Purchase[]>} - Returns a Promise with the response from the API.
     */
    public async getOwnPurchases({
        buyerId,
        mostRecent,
        getAll,
        n,
        offset
    }: VRCAPI.Economy.Requests.GetOwnPurchasesRequest): Promise<VRCAPI.Economy.Models.Purchase[]> {

        const queryOptions = new URLSearchParams();
        if (buyerId) queryOptions.append('buyerId', buyerId);
        if (mostRecent) queryOptions.append('mostRecent', mostRecent.toString());
        if (getAll) queryOptions.append('getAll', getAll.toString());
        if (n) queryOptions.append('n', n.toString());
        if (offset) queryOptions.append('offset', offset.toString());


        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getOwnPurchases,
            pathFormated: ApiPaths.economy.getOwnPurchases.path,
            queryOptions: queryOptions,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.Purchase[]>(paramRequest);
    }

    /**
     * Get the current user's transactions.
     * 
     * @param {VRCAPI.Economy.Requests.GetOwnTransactionsRequest} param0 - The request parameters.
     * @returns {Promise<VRCAPI.Economy.Models.Transactions>} - Returns a Promise with the response from the API.
     */
    public async getOwnTransactions({
        type = VRCAPI.Economy.Models.TransactionType.All,
        order,
        sort,
        metadata,
        search,
        n,
        offset
    }: VRCAPI.Economy.Requests.GetOwnTransactionsRequest): Promise<VRCAPI.Economy.Models.Transactions> {

        const queryOptions = new URLSearchParams();
        queryOptions.append('type', type);

        if (order) queryOptions.append('order', order);
        if (sort) queryOptions.append('sort', sort);
        if (metadata) queryOptions.append('metadata', metadata.toString());
        if (search) queryOptions.append('search', search);
        if (n) queryOptions.append('n', n.toString());
        if (offset) queryOptions.append('offset', offset.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getOwnTransactions,
            pathFormated: ApiPaths.economy.getOwnTransactions.path,
            queryOptions: queryOptions,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.Transactions>(paramRequest);
    }

    /**
     * Get the current user's Tilia information.
     * 
     * Only works for your own account. Specially for this endpoint you can Omit the `userId` parameter.
     * 
     * @param param0 
     * @returns 
     */
    public async getTiliaSyncData({
        userId
    }: VRCAPI.Economy.Requests.GetTiliaTOSRequest): Promise<VRCAPI.Economy.Models.SyncData> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getTiliaSyncData,
            pathFormated: userId ? ApiPaths.economy.getTiliaSyncData.path.replace('{userId}', userId) : ApiPaths.economy.getTiliaSyncData.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.SyncData>(paramRequest);
    }

    /**
     * Get the current user's balance.
     * 
     * Only works for your own account. So you can Omit the `userId` parameter.
     * 
     * @param {VRCAPI.Economy.Requests.GetUserBalanceRequest} param0 - The request parameters.
     * @returns {Promise<VRCAPI.Economy.Models.Balance>} - Returns a Promise with the response from the API.
     */
    public async getBalance({
        userId
    }: VRCAPI.Economy.Requests.GetUserBalanceRequest): Promise<VRCAPI.Economy.Models.Balance> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.economy.getBalance,
            pathFormated: userId ? ApiPaths.economy.getBalance.path.replace('{userId}', userId) : ApiPaths.economy.getBalance.path,
        };

        return await this.executeRequest<VRCAPI.Economy.Models.Balance>(paramRequest);
    }

    public async getLicenses({
        licenseId
    }: VRCAPI.Economy.Requests.GetLicenseRequest): Promise<VRCAPI.Economy.Models.License> {
            
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.economy.getLicenses,
                pathFormated: ApiPaths.economy.getLicenses.path.replace('{licenseId}', licenseId),
            };
    
            return await this.executeRequest<VRCAPI.Economy.Models.License>(paramRequest);
        }
}
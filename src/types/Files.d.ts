declare namespace VRCAPI {
    namespace Files {
        namespace Models {
            type UnityPackage = {
                assetUrl?: string; // Min 1 chars
                assetUrlObject?: object;
                assetVersion: number; // Min 0
                created_at?: string; // date-time
                id: string; // Pattern: (unp)_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
                platform: string; // Can be various values like standalonewindows, android, or specific Unity versions
                pluginUrl?: string;
                pluginUrlObject?: object;
                unitySortNumber?: number; // Min 0
                unityVersion: string; // Min 1 chars, Default: 5.3.4p1
            };

        }
        namespace Requests {

        }
    }
}
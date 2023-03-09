<script lang="ts">
    import { createPortTransport, createRPC, POPUP_PORT_NAME } from '../../messages';

    const port = chrome.runtime.connect({ name: POPUP_PORT_NAME });

    const transport = createPortTransport(port);

    export const rpc = createRPC(transport);

    export type Network = '0L';

    export interface Account {
        network: Network;
        publicKey: Uint8Array;
    }

    let approveConnection: (accounts: Account[]) => void;
    let denyConnection: () => void;
    rpc.exposeMethod('connect', async () => {
        return new Promise((resolve) => {
            approveConnection = (accounts: Account[]) => {
                resolve(accounts);
            };
            denyConnection = () => {
                resolve(null);
            };
        });
    });

    export const ApproveConnection: FC = () => {
        const accounts = [];

        const selectedAccounts = [];
        const setSelectedAccounts = () => {};
        let hasSelectedAccounts = true; //selectedAccounts.size > 0;

        const isAccountSelected = (address: string) => true; //selectedAccounts.has(address);

        const handleAccountSelected = (address: string, selected: boolean) => {
            if (selected) {
                const account = accounts.find((account) => account.address === address)!;
                // setSelectedAccounts((prevSelectedAccounts) => {
                //     prevSelectedAccounts.set(address, {
                //         network: account.network,
                //         publicKey: account.publicKey,
                //     });
                //     return new Map(prevSelectedAccounts.entries());
                // });
            } else {
                // setSelectedAccounts((prevSelectedAccounts) => {
                //     prevSelectedAccounts.delete(address);
                //     return new Map(prevSelectedAccounts.entries());
                // });
            }
        };

        return;
    };

</script>

<div>
    <h1>Approve Connection</h1>
    <ul>
        <!-- {accounts.map((account) => (
            <li key={account.address}>
                <input
                    type="checkbox"
                    id={account.address}
                    checked={isAccountSelected(account.address)}
                    onChange={(event) => {
                        const address = event.target.value;
                        const selected = event.target.checked;
                        handleAccountSelected(address, selected);
                    }}
                    value={account.address}
                />
                <label htmlFor={account.address}>{account.address}</label>
            </li>
        ))} -->
    </ul>
    <div>
        <button type="button" onClick={denyConnection}>
            Deny
        </button>
        <button
            type="button"
            disabled={false}
        >
            Approve
        </button>
    </div>
</div>
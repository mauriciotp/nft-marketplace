import { CryptoHookFactory } from '@_types/hooks';
import useSWR from 'swr';

const NETWORKS: { [k: string]: string } = {
  1: 'Ethereum Main Network',
  5: 'Goerli Test Network',
  1337: 'Ganache',
  11155111: 'Sepolia Test Network',
};

type UseNetworkResponse = {
  isLoading: boolean;
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId;

        if (!chainId) {
          throw 'Cannot retrieve network. Please, refresh browser or connect to other one.';
        }

        return NETWORKS[chainId];
      },
      {
        revalidateOnFocus: false,
      }
    );

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading || isValidating,
    };
  };

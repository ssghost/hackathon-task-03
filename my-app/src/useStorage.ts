import { WalletConnection } from '@concordium/react-components';
import { Result, ResultAsync } from 'neverthrow';
import { useCallback } from 'react';
import { CcdAmount, AccountTransactionType } from '@concordium/web-sdk';
import { TESTNET, MAX_CONTRACT_EXECUTION_ENERGY } from './config';
import { Schema } from './Storage';
import { Info, resultFromTruthy } from './Contract';

function contractUpdatePayload(amount: CcdAmount, contract: Info, method: string) {
    return {
        amount,
        address: {
            index: contract.index,
            subindex: BigInt(0),
        },
        receiveName: `${contract.name}.${method}`,
        maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
    };
}

export async function submitRecv(connection: typeof WalletConnection, amount: CcdAmount, schema: Schema, account: string, contract: Info) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        contractUpdatePayload(amount, contract, 'receive'),
        schema,
        ''
    );
}

export function useStorage(
    connection: typeof WalletConnection | undefined,
    account: string | undefined,
    contract: Info | undefined
) {
    const canRecv = Boolean(account) && account === contract?.owner.address;
    const receive = useCallback(
        (schema: Schema) =>
            Result.combine([
                resultFromTruthy(connection, 'no connection initialized'),
                resultFromTruthy(account, 'no account connected'),
                resultFromTruthy(contract, 'no contract'),
            ])
                .asyncAndThen(([client, account, contract]: [any,any,any]) =>
                    ResultAsync.fromPromise(
                        submitRecv(client, new CcdAmount(0.1), schema, account, contract),
                        (e: any) => (e as Error).message
                    )
                )
                .map((txHash: any) => {
                    console.debug(`${TESTNET.ccdScanBaseUrl}/?dcount=1&dentity=transaction&dhash=${txHash}`);
                    return txHash;
                })
                .match(
                    (txHash:any) => console.log('storage transaction submitted', { hash: txHash }),
                    (e:any) => console.error('cannot submit storage transaction', { error: e })
                ),
        [connection, account, contract]
    );
    return { canRecv, receive };
}